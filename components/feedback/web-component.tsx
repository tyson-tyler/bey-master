import ReactDom from "react-dom/client";
import Widget from "./widget";

export const normalizeAttribute = (attribute: string): string => {
  return attribute.replace(/-([a-z])/g, (_, letter: string) =>
    letter.toUpperCase()
  );
};

interface WidgetProps {
  [key: string]: string | undefined;
}

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    const root = ReactDom.createRoot(this.shadowRoot as ShadowRoot);
    root.render(<Widget {...props} />);
  }

  getPropsFromAttributes(): WidgetProps {
    const props: WidgetProps = {};
    for (const { name, value } of Array.from(this.attributes)) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default WidgetWebComponent;
