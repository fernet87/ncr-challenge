import { createPopper } from '@popperjs/core';
import { createRef, useEffect } from 'react';


export default function Tooltip(props) {
  const tooltipRef = createRef();

  useEffect(() => {
    const tooltip = tooltipRef.current;
    const popcorn = document.querySelectorAll('[data-toggle="tooltip"]')[0];
    
    const popperInstance = createPopper(popcorn, tooltip, {
      placement: 'left',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ]
    });
    
    function show() {
      // Make the tooltip visible
      tooltip.setAttribute('data-show', '');
    
      // Enable the event listeners
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: true }
        ],
      }));
    
      // Update its position
      popperInstance.update();
    }
    
    function hide() {
      // Hide the tooltip
      tooltip.removeAttribute('data-show');
    
      // Disable the event listeners
      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          ...options.modifiers,
          { name: 'eventListeners', enabled: false }
        ],
      }));
    }
    
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];
    
    showEvents.forEach((event) => {
      popcorn.addEventListener(event, show);
    });
    
    hideEvents.forEach((event) => {
      popcorn.addEventListener(event, hide);
    });
  });
  
  return (
    <div id="tooltip" role="tooltip" ref={tooltipRef} >
      <div id="arrow" data-popper-arrow></div>
    </div>
  );
}