export const truncateContent = (htmlContent, limit = 130) => {

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  const textContent = tempDiv.textContent || tempDiv.innerText || '';


  if (textContent.length <= limit) {
    return textContent;
  }

  return textContent.slice(0, limit) + '...';
};
