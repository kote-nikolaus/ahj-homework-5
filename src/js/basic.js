/* eslint-disable radix */

const popoverButtons = Array.from(document.getElementsByClassName('popover-button'));

function showPopover() {
  const activePopover = document.getElementById(`${this.dataset.id}`);
  if (activePopover) {
    document.body.removeChild(activePopover);
  } else {
    const popover = document.createElement('div');
    const buttonCoords = this.getBoundingClientRect();
    const bodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-left'));
    popover.className = 'popover';
    popover.id = `popover${this.dataset.id}`;
    popover.innerHTML = "<h2 class='popover-title'>Popover title</h2><p class='popover-text'>Here it is!</p>";
    document.body.appendChild(popover);
    popover.style.top = `${window.scrollY + this.offsetTop - popover.offsetHeight - 10}px`;
    popover.style.left = `${window.scrollX + ((popover.offsetWidth - this.offsetWidth) / 2) + buttonCoords.x - bodyPadding}px`;
  }
}

for (let i = 0; i < popoverButtons.length; i += 1) {
  popoverButtons[i].onclick = showPopover;
}
