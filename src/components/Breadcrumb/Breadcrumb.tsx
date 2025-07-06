import React from "react";
import { Link } from "react-router-dom"; 
import "./styles.css";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<Props> = ({ items }) => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index}>
              {item.href && !isLast ? (
                <Link to={item.href}>{item.label}</Link>
              ) : (
                <span className="current">{item.label}</span>
              )}
              {!isLast && <span className="separator">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
