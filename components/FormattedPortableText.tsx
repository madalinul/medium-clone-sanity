import React from 'react';
import { TypedObject } from '../typings';
import { PortableText } from '@portabletext/react';

interface FormattedPortableTextProps {
  value: TypedObject[];
}

const FormattedPortableText = ({ value }: FormattedPortableTextProps) => {
  return (
    <PortableText
      value={value}
      components={{
        block: {
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold my-5">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-bold my-5">{children}</h2>
          ),
        },
        listItem: {
          bullet: ({ children }) => (
            <li className="ml-4 list-disc">{children}</li>
          ),
        },
        marks: {
          link: ({ value, children }) => (
            <a href={value.href} className="text-blue-500 hover:underline">
              {children}
            </a>
          ),
        },
      }}
    />
  );
};

export default FormattedPortableText;
