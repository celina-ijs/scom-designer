import {
  Module,
  ControlElement,
  customElements,
  Container,
  Styles,
  VStack,
  Input,
  Range
} from '@ijstech/components'
import { bgInputTransparent, textInputRight, unitStyled } from './index.css';
const Theme = Styles.Theme.ThemeVars;

interface DesignerToolEffectsElement extends ControlElement {

}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['designer-tool-effects']: DesignerToolEffectsElement
    }
  }
}

@customElements('designer-tool-effects')
export default class DesignerToolEffects extends Module {
  private vStackContent: VStack;
  private inputEffect: Input;
  private rangeEffect: Range;

  constructor(parent?: Container, options?: DesignerToolEffectsElement) {
    super(parent, options);
  }

  private onCollapse(isShown: boolean) {
    this.vStackContent.visible = isShown;
  }

  private renderUI() {
    this.inputEffect.value = this.rangeEffect.value = 100;
  }

  private onInputEffectChanged() {
    this.rangeEffect.value = this.inputEffect.value;
  }

  private onRangeChanged() {
    this.inputEffect.value = this.rangeEffect.value;
  }

  init() {
    super.init();
    this.renderUI();
  }

  render() {
    return (
      <i-vstack
        width="100%"
        height="100%"
        margin={{ left: "auto", right: "auto" }}
        position="relative"
      >
        <designer-tool-header name="Effects" tooltipText="Set elevation and opacity for the element." onCollapse={this.onCollapse} />
        <i-vstack id="vStackContent" gap={8} padding={{ top: 16, bottom: 16, left: 12, right: 12 }}>
          <i-grid-layout templateColumns={['70px', 'auto']} verticalAlignment="center">
            <i-label caption="Opacity" font={{ size: '0.75rem' }} />
            <i-hstack gap={16} verticalAlignment="center">
              <i-hstack verticalAlignment="center" width={80} border={{ radius: 8 }} background={{ color: Theme.input.background }} overflow="hidden">
                <i-input
                  id="inputEffect"
                  inputType="number"
                  placeholder="auto"
                  background={{ color: 'transparent' }}
                  width="calc(100% - 24px)"
                  height={24}
                  border={{ width: 0 }}
                  padding={{ left: 4, right: 2 }}
                  font={{ size: '0.725rem' }}
                  class={`${textInputRight} ${bgInputTransparent}`}
                  onChanged={this.onInputEffectChanged}
                />
                <i-label
                  caption="%"
                  font={{ size: '0.725rem' }}
                  width={24}
                  height={24}
                  lineHeight="24px"
                  border={{
                    left: {
                      width: 1,
                      style: 'solid',
                      color: Theme.action.focus
                    }
                  }}
                  class="text-center"
                />
              </i-hstack>
              <i-hstack width="calc(100% - 96px)" verticalAlignment="center">
                <i-range
                  id="rangeEffect"
                  width="100%"
                  height={16}
                  min={0}
                  max={100}
                  onChanged={this.onRangeChanged}
                />
              </i-hstack>
            </i-hstack>
          </i-grid-layout>
        </i-vstack>
      </i-vstack>
    )
  }
}
