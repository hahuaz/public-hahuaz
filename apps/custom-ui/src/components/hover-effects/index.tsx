import "./index.scss";

import * as Icons from "react-icons/fa6";

type IconType = keyof typeof Icons;

const DynamicIcon = ({ name }: { name: IconType }) => {
  const IconComponent = Icons[name];
  return IconComponent ? <IconComponent /> : null;
};

export const HoverEffects = () => {
  const data = [
    {
      title: "TYPE-1",
      heading: "Hello World!",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      title: "TYPE-2",
      heading: "Hello World!",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      title: "TYPE-3",
      heading: "Hello World!",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      title: "TYPE-4",
      heading: "Hello World!",
      icons: ["FaEye", "FaLink", "FaCartPlus"],
    },
    {
      title: "TYPE-5",
      heading: "Hello World!",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      title: "TYPE-6",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      title: "TYPE-7",
      paragraphs: [
        "Do quis cillum deserunt adipisicing do",
        "Non qui enim ad ad id irure in aute",
        "Labore irure adipisicing ullamco sint do aute.",
      ],
    },
    { title: "TYPE-8", heading: "Hello World!" },
    {
      title: "TYPE-9",
      text: "Lorem ipsum dolor...",
    },
  ];

  return (
    <div className="hover-effects">
      {data.map((item, index) => (
        <div className="block" key={index}>
          <div className="container">
            <h1>{item.title}</h1>
            <div className={`type type${index + 1}`}>
              <div className="content">
                {item.heading && <h1>{item.heading}</h1>}
                {item.text && <p>{item.text}</p>}
                {item.paragraphs &&
                  item.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
                {item.icons &&
                  item.icons.map((icon) => (
                    <DynamicIcon key={index} name={icon as IconType} />
                  ))}
              </div>
              <img src="/candy.png" alt="Candy" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HoverEffects;
