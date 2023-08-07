import React from "react";

const RippleButton = () => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;

    const circle = document.createElement("span");
    circle.classList.add("ripple");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;

    // position circle(absolute) inside the parent button(relative) with considiring where click event occured
    circle.style.left = `${e.clientX - (button.offsetLeft + radius)}px`;
    circle.style.top = `${e.clientY - (button.offsetTop + radius)}px`;

    // remove previous circle
    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    // add new circle which will trigger animation
    button.appendChild(circle);
  };

  return (
    <button
      className="relative overflow-hidden rounded-md  bg-purple-600 px-6 py-3 text-white"
      onClick={handleClick}
    >
      Click Me
    </button>
  );
};

export default RippleButton;
