import { Module, customModule, Container, Button, LibPath, application } from '@ijstech/components';
import { ScomDesigner } from '@scom/scom-designer';
import {Compiler} from '@ijstech/compiler';

@customModule
export default class Module1 extends Module {
    private scomDesigner: ScomDesigner;
    private export: Button;

    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    async init() {
        await super.init();
        this.scomDesigner.previewUrl = '/0.1.0-beta/libs/@scom/scom-designer/debug.html';
        this.scomDesigner.setValue({
            file: {
                path: 'hello_word.tact',
                content: `import "@stdlib/deploy";

message Add {
amount: Int as uint32;
}

contract SampleTactContract with Deployable {

owner: Address;
counter: Int as uint32;

init(owner: Address) {
self.owner = owner;
self.counter = 0;
}

fun add(v: Int) {

// Check sender
let ctx: Context = context();
require(ctx.sender == self.owner, "Invalid sender");

// Update counter
self.counter += v;
}

receive(msg: Add) {
self.add(msg.amount);
}

receive("increment") {
self.add(1);
self.reply("incremented".asComment());
}

get fun counter(): Int {
return self.counter;
}
}

`
            }
        })
    }

    onShow() {
        this.scomDesigner.onShow();
    }
    private async handlePreview(): Promise<{module: string, script: string}>{
        let value = `///<amd-module name='@scom/debug-module'/> \n` + this.scomDesigner.value;
        let compiler = new Compiler()
        await compiler.addFile(
            'index.tsx',
            value,
            this.getImportFile
        );
        let result = await compiler.compile(false)
        return {
            module: '@scom/debug-module',
            script: result.script['index.js']
        };
    }
    onChanged(value: string) {
        console.dir(value)
    }
    async getImportFile(fileName?: string, isPackage?: boolean): Promise<{fileName: string, content: string}>{
        if (isPackage){
            let content = await application.getContent(`${application.rootDir}libs/${fileName}/index.d.ts`);
            return {
                fileName: 'index.d.ts',
                content: content
            }
        };
    }
    async onButton() {        
        const value = this.scomDesigner.value;
        const aElement = document.createElement('a');
        aElement.setAttribute('download', 'demo.tsx');
        const res = new Blob([value], { type: 'text/plain' });
        const href = URL.createObjectURL(res);
        aElement.href = href;
        aElement.setAttribute('target', '_blank');
        aElement.click();
        URL.revokeObjectURL(href);

    }

    render() {
        return (
            <i-panel width="100%" height="100%">
                <i-button id="export" caption='Get value' onClick={this.onButton.bind(this)}></i-button>
                <i-scom-designer
                    id="scomDesigner"
                    display='block' width="100%" height="100%"
                    // url="https://storage.decom.app/ipfs/bafybeiekmzv3mmjgmfclcqe2gwpkzpptloolm4merj3cwnvb7d7pdv4v2m/demo.tsx"
                    onPreview={this.handlePreview.bind(this)}
                ></i-scom-designer>
            </i-panel>
        )
    }
}