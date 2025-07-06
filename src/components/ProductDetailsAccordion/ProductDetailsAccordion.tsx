import * as Accordion from "@radix-ui/react-accordion";

import React from "react";
import "./styles.css";

interface AccordionSection {
  title: string;
  content: string; // HTML string
}

interface Props {
  sections: AccordionSection[];
}

const ProductAccordion: React.FC<Props> = ({ sections }) => {
  return (
    <Accordion.Root type="multiple" className="accordion-root">
      {sections.map((section, index) => (
        <Accordion.Item key={index} value={`item-${index}`} className="accordion-item">
          <Accordion.Header className="accordion-header">
            <Accordion.Trigger className="accordion-trigger">
              {section.title}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="accordion-content">
            <div
              className="accordion-content-inner"
              dangerouslySetInnerHTML={{ __html: section.content }}
            />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};

export default ProductAccordion;
