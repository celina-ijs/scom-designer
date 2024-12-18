import {
  Module,
  Styles,
  VStack,
  ControlElement,
  customElements,
  Icon,
  Panel,
  Container
} from '@ijstech/components'
import { IBlock } from '../interface';
import { blockItemHoverStyled } from '../index.css';
import { componentsJson } from '../languages/index';
const Theme = Styles.Theme.ThemeVars;


interface DesignerPickerBlocksElement extends ControlElement {
  items: IBlock[];
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['designer-picker-blocks']: DesignerPickerBlocksElement
    }
  }
}

@customElements('designer-picker-blocks')
export default class DesignerPickerBlocks extends Module {
  private items: IBlock[];
  private isShown = true;

  private iconArrow: Icon;
  private vStackItems: VStack;

  constructor(parent?: Container, options?: DesignerPickerBlocksElement) {
    super(parent, options);
  }

  private onDeleteCustomBlock(id: string) {
    // TODO
  }

  private renderUI() {
    this.iconArrow.name = 'angle-down';
    const nodeItems: HTMLElement[] = [];
    for (const item of this.items) {
      const { id, caption, image, path } = item;
      const block = new Panel(undefined, { width: '100%', height: 'auto', background: { color: Theme.background.main }, padding: { top: 6, bottom: 6, left: 8, right: 8 } });
      block.appendChild(
        <i-hstack gap={8} width="100%" height="100%" verticalAlignment="center" horizontalAlignment="space-between">
          <i-hstack gap={8} verticalAlignment="center" wrap="wrap">
            { image ? <i-image url={image} width={24} height={24} /> : [] }
            <i-label caption={caption} font={{ size: '0.75rem' }} />
          </i-hstack>
          <i-icon name="trash" width={16} height={16} cursor="pointer" tooltip={{ content: '$delete_custom_block' }} onClick={() => this.onDeleteCustomBlock(id)} />
        </i-hstack>
      );
      block.classList.add(blockItemHoverStyled);
      nodeItems.push(block);
    }
    this.vStackItems.clearInnerHTML();
    this.vStackItems.append(...nodeItems);
  }

  private onCollapse() {
    this.isShown = !this.isShown;
    this.vStackItems.visible = this.isShown;
    this.iconArrow.name = this.isShown ? 'angle-down' : 'angle-right';
  }

  init() {
    this.i18n.init({...componentsJson});
    super.init();
    this.items = this.getAttribute('items', true) || [];
    this.renderUI();
  }

  render() {
    return (
      <i-vstack
        width="100%"
        height="100%"
        margin={{ left: "auto", right: "auto" }}
        position="relative"
        background={{ color: Theme.background.main }}
      >
        <i-hstack gap={8} verticalAlignment="center" cursor="pointer" padding={{ left: 8, right: 8, bottom: 8, top: 8 }} onClick={this.onCollapse}>
          <i-icon id="iconArrow" name="angle-down" width={14} height={14} />
          <i-label caption="$your_blocks" font={{ size: '0.75rem', bold: true }} />
          <i-icon name="question-circle" width={14} height={14} opacity={0.8} tooltip={{ content: '$your_own_custom_components' }} />
        </i-hstack>
        <i-vstack id="vStackItems" gap={4} width="100%" />
      </i-vstack>
    )
  }
}
