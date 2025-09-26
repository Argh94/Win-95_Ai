function makeWindowDraggable(windowEl, headerEl) {
  let offsetX, offsetY, isDragging = false;

  headerEl.addEventListener('mousedown', function (e) {
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    document.body.style.userSelect = "none";
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + windowEl.offsetWidth > window.innerWidth)
      newLeft = window.innerWidth - windowEl.offsetWidth;
    if (newTop + windowEl.offsetHeight > window.innerHeight - 50)
      newTop = window.innerHeight - windowEl.offsetHeight - 50;
    windowEl.style.left = newLeft + "px";
    windowEl.style.top = newTop + "px";
  });

  document.addEventListener('mouseup', function () {
    isDragging = false;
    document.body.style.userSelect = "";
  });

  headerEl.addEventListener('touchstart', function (e) {
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    offsetX = e.touches[0].clientX - windowEl.offsetLeft;
    offsetY = e.touches[0].clientY - windowEl.offsetTop;
    document.body.style.userSelect = "none";
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (!isDragging) return;
    let newLeft = e.touches[0].clientX - offsetX;
    let newTop = e.touches[0].clientY - offsetY;
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + windowEl.offsetWidth > window.innerWidth)
      newLeft = window.innerWidth - windowEl.offsetWidth;
    if (newTop + windowEl.offsetHeight > window.innerHeight - 50)
      newTop = window.innerHeight - windowEl.offsetHeight - 50;
    windowEl.style.left = newLeft + "px";
    windowEl.style.top = newTop + "px";
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', function () {
    isDragging = false;
    document.body.style.userSelect = "";
  });
}

function makeWindowResizable(windowEl, resizeHandle) {
  let startX, startY, startW, startH, isResizing = false;

  resizeHandle.addEventListener('mousedown', function (e) {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = windowEl.offsetWidth;
    startH = windowEl.offsetHeight;
    e.preventDefault();
    document.body.style.userSelect = "none";
  });

  document.addEventListener('mousemove', function (e) {
    if (!isResizing) return;
    let newW = Math.max(320, startW + (e.clientX - startX));
    let newH = Math.max(250, startH + (e.clientY - startY));
    if (newW > window.innerWidth) newW = window.innerWidth;
    if (newH > window.innerHeight - 50) newH = window.innerHeight - 50;
    windowEl.style.width = newW + "px";
    windowEl.style.minHeight = newH + "px";
  });

  document.addEventListener('mouseup', function () {
    isResizing = false;
    document.body.style.userSelect = "";
  });

  resizeHandle.addEventListener('touchstart', function (e) {
    isResizing = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startW = windowEl.offsetWidth;
    startH = windowEl.offsetHeight;
    e.preventDefault();
    document.body.style.userSelect = "none";
  }, { passive: true });

  document.addEventListener('touchmove', function (e) {
    if (!isResizing) return;
    let newW = Math.max(320, startW + (e.touches[0].clientX - startX));
    let newH = Math.max(250, startH + (e.clientY - startY));
    if (newW > window.innerWidth) newW = window.innerWidth;
    if (newH > window.innerHeight - 50) newH = window.innerHeight - 50;
    windowEl.style.width = newW + "px";
    windowEl.style.minHeight = newH + "px";
    e.preventDefault();
  }, { passive: false });

  document.addEventListener('touchend', function () {
    isResizing = false;
    document.body.style.userSelect = "";
  });
}

const WORKER_URL = 'https://llm-ai-win98.tahmasebimoein140.workers.dev';

function showError(message) {
  const errorWindow = document.getElementById('error-window');
  const errorMessage = document.getElementById('error-message');
  if (errorWindow && errorMessage) {
    errorMessage.textContent = message;
    errorWindow.classList.remove('hidden');
    errorWindow.style.zIndex = '1000';
    console.log('Error shown:', message); 
  } else {
    console.error('Error: Cannot find error window or message element');
  }
}

const closeErrorBtn = document.getElementById('close-error');
const errorOkBtn = document.getElementById('error-ok-btn');
if (closeErrorBtn) {
  closeErrorBtn.addEventListener('click', function () {
    document.getElementById('error-window').classList.add('hidden');
    console.log('Error window closed via close button');
  });
}
if (errorOkBtn) {
  errorOkBtn.addEventListener('click', function () {
    document.getElementById('error-window').classList.add('hidden');
    console.log('Error window closed via OK button');
  });
}

let windowCount = 0;
function createNewChatWindow() {
  windowCount++;
  const windowId = `chat-window-${windowCount}`;
  const newWindow = document.createElement('div');
  newWindow.className = 'window';
  newWindow.id = windowId;
  newWindow.style.left = `${40 + windowCount * 20}px`;
  newWindow.style.top = `${40 + windowCount * 20}px`;
  newWindow.style.width = '520px';
  newWindow.style.minHeight = '380px';
  newWindow.innerHTML = `
    <div class="window-header" id="chat-header-${windowCount}">
      <img src="icons/gpt.png" alt="chat-icon" class="window-icon">
      <span>WinGPT</span>
      <div class="window-controls">
        <button class="minimize-btn" title="Minimize"></button>
        <button class="restore-btn" title="Restore"></button>
        <button class="close-btn" title="Close"></button>
      </div>
    </div>
    <div class="toolbar">
      <button class="new-chat">New Chat</button>
      <div class="models-dropdown">
        <button class="model-btn">Select Model ▼</button>
        <ul class="models-list hidden">
          <li>
            <label class="checkbox-label">
              <img src="icons/icwdial101.png" alt="model-icon" class="model-icon">
              <input type="checkbox" class="model-checkbox" data-model="deepseek/deepseek-chat-v3.1:free">
              <span class="checkbox-custom"></span>
              DeepSeek Chat V3.1 (Free)
            </label>
          </li>
          <li>
            <label class="checkbox-label">
              <img src="icons/icwdial101.png" alt="model-icon" class="model-icon">
              <input type="checkbox" class="model-checkbox" data-model="openai/gpt-oss-20b:free">
              <span class="checkbox-custom"></span>
              GPT-OSS-20B (Free)
            </label>
          </li>
          <li>
            <label class="checkbox-label">
              <img src="icons/icwdial101.png" alt="model-icon" class="model-icon">
              <input type="checkbox" class="model-checkbox" data-model="meta-llama/llama-3.3-8b-instruct:free">
              <span class="checkbox-custom"></span>
              LLaMA 3.3 8B (Free)
            </label>
          </li>
        </ul>
      </div>
    </div>
    <div class="chat-content"></div>
    <form class="chat-form" autocomplete="off">
      <input type="text" class="chat-input" placeholder="Ask anything…" autocomplete="off" />
      <button type="submit" class="send-btn">Send</button>
      <div class="spinner hidden"></div>
    </form>
    <div class="footer"></div>
    <div class="resize-handle"></div>
  `;
  document.body.appendChild(newWindow);

  const header = newWindow.querySelector(`#chat-header-${windowCount}`);
  const resizeHandle = newWindow.querySelector('.resize-handle');
  makeWindowDraggable(newWindow, header);
  makeWindowResizable(newWindow, resizeHandle);

  const minimizeBtn = newWindow.querySelector('.minimize-btn');
  const restoreBtn = newWindow.querySelector('.restore-btn');
  const closeBtn = newWindow.querySelector('.close-btn');

  minimizeBtn.addEventListener('click', function () {
    newWindow.classList.add('hidden');
    console.log(`Chat window ${windowId} minimized`);
  });

  restoreBtn.addEventListener('click', function () {
    newWindow.classList.remove('hidden');
    console.log(`Chat window ${windowId} restored`);
  });

  closeBtn.addEventListener('click', function () {
    newWindow.remove();
    console.log(`Chat window ${windowId} closed`);
  });

  const chatContent = newWindow.querySelector('.chat-content');
  const chatForm = newWindow.querySelector('.chat-form');
  const chatInput = newWindow.querySelector('.chat-input');
  const chatFooter = newWindow.querySelector('.footer');
  const sendBtn = newWindow.querySelector('.send-btn');
  const spinner = newWindow.querySelector('.spinner');
  let currentModel = null;

  function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = 'chat-message ' + role;
    div.innerHTML = `<div class="chat-message-content">${text}</div>`;
    chatContent.appendChild(div);
    chatContent.scrollTop = chatContent.scrollHeight;
  }

  chatForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!currentModel) {
      showError('Please select an AI model before sending a message.');
      console.log('Error: No model selected');
      return;
    }
    if (!text) {
      showError('Please enter a message to send.');
      console.log('Error: Empty message');
      return;
    }

    appendMessage('user', text);
    chatInput.value = '';
    chatFooter.textContent = "Thinking…";
    sendBtn.classList.add('hidden');
    spinner.classList.remove('hidden');
    console.log('Sending request with model:', currentModel);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: currentModel,
          messages: [{ role: 'user', content: text }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch response from Worker: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error('Invalid response format from Worker');
      }
      const aiResponse = data.choices[0].message.content;
      appendMessage('ai', aiResponse);
      chatFooter.textContent = "Model: " + (currentModel === 'deepseek/deepseek-chat-v3.1:free' ? 'DeepSeek Chat V3.1 (Free)' :
                                          currentModel === 'openai/gpt-oss-20b:free' ? 'GPT-OSS-20B (Free)' :
                                          'LLaMA 3.3 8B (Free)');
    } catch (error) {
      appendMessage('ai', `Error: ${error.message}`);
      chatFooter.textContent = "Model: " + (currentModel === 'deepseek/deepseek-chat-v3.1:free' ? 'DeepSeek Chat V3.1 (Free)' :
                                          currentModel === 'openai/gpt-oss-20b:free' ? 'GPT-OSS-20B (Free)' :
                                          'LLaMA 3.3 8B (Free)');
    } finally {
      sendBtn.classList.remove('hidden');
      spinner.classList.add('hidden');
      console.log('Request completed');
    }
  });

  const modelBtn = newWindow.querySelector('.model-btn');
  const modelsList = newWindow.querySelector('.models-list');
  const checkboxes = newWindow.querySelectorAll('.model-checkbox');
  if (modelBtn && modelsList) {
    modelBtn.addEventListener('click', function (e) {
      modelsList.classList.toggle('hidden');
      e.stopPropagation();
      console.log('Model dropdown toggled');
    });
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        checkboxes.forEach(cb => {
          if (cb !== this) cb.checked = false;
        });
        currentModel = this.dataset.model;
        modelBtn.textContent = "Model: " + this.parentElement.textContent.trim();
        modelsList.classList.add('hidden');
        chatFooter.textContent = "Model: " + this.parentElement.textContent.trim();
        console.log('Model selected:', currentModel);
      });
    });
  } else {
    console.error('Model button or list not found in new window');
  }

  const newChatBtn = newWindow.querySelector('.new-chat');
  if (newChatBtn) {
    newChatBtn.addEventListener('click', createNewChatWindow);
    console.log('New chat button initialized');
  }

  return newWindow;
}

const initialChatWindow = document.getElementById('chat-window');
if (initialChatWindow) {
  makeWindowDraggable(initialChatWindow, document.getElementById('chat-header'));
  makeWindowResizable(initialChatWindow, initialChatWindow.querySelector('.resize-handle'));

  const minimizeChat = document.getElementById('minimize-chat');
  const restoreChat = document.getElementById('restore-chat');
  const closeChat = document.getElementById('close-chat');

  minimizeChat.addEventListener('click', function () {
    initialChatWindow.classList.add('hidden');
    console.log('Initial chat window minimized');
  });

  restoreChat.addEventListener('click', function () {
    initialChatWindow.classList.remove('hidden');
    console.log('Initial chat window restored');
  });

  closeChat.addEventListener('click', function () {
    initialChatWindow.classList.add('hidden');
    console.log('Initial chat window closed');
  });
}

const chatContent = document.getElementById('chat-content');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatFooter = document.getElementById('chat-footer');
const sendBtn = document.getElementById('send-btn');
const spinner = document.getElementById('spinner');
let currentModel = null;

function appendMessage(role, text) {
  if (chatContent) {
    const div = document.createElement('div');
    div.className = 'chat-message ' + role;
    div.innerHTML = `<div class="chat-message-content">${text}</div>`;
    chatContent.appendChild(div);
    chatContent.scrollTop = chatContent.scrollHeight;
  }
}

if (chatForm) {
  chatForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const text = chatInput.value.trim();

    if (!currentModel) {
      showError('Please select an AI model before sending a message.');
      console.log('Error: No model selected');
      return;
    }
    if (!text) {
      showError('Please enter a message to send.');
      console.log('Error: Empty message');
      return;
    }

    appendMessage('user', text);
    chatInput.value = '';
    chatFooter.textContent = "Thinking…";
    sendBtn.classList.add('hidden');
    spinner.classList.remove('hidden');
    console.log('Sending request with model:', currentModel);

    try {
      const response = await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: currentModel,
          messages: [{ role: 'user', content: text }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch response from Worker: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        throw new Error('Invalid response format from Worker');
      }
      const aiResponse = data.choices[0].message.content;
      appendMessage('ai', aiResponse);
      chatFooter.textContent = "Model: " + (currentModel === 'deepseek/deepseek-chat-v3.1:free' ? 'DeepSeek Chat V3.1 (Free)' :
                                          currentModel === 'openai/gpt-oss-20b:free' ? 'GPT-OSS-20B (Free)' :
                                          'LLaMA 3.3 8B (Free)');
    } catch (error) {
      appendMessage('ai', `Error: ${error.message}`);
      chatFooter.textContent = "Model: " + (currentModel === 'deepseek/deepseek-chat-v3.1:free' ? 'DeepSeek Chat V3.1 (Free)' :
                                          currentModel === 'openai/gpt-oss-20b:free' ? 'GPT-OSS-20B (Free)' :
                                          'LLaMA 3.3 8B (Free)');
    } finally {
      sendBtn.classList.remove('hidden');
      spinner.classList.add('hidden');
      console.log('Request completed');
    }
  });
}

const modelBtn = document.getElementById('model-btn');
const modelsList = document.getElementById('models-list');
const checkboxes = document.querySelectorAll('#models-list .model-checkbox');
if (modelBtn && modelsList) {
  modelBtn.addEventListener('click', function (e) {
    modelsList.classList.toggle('hidden');
    e.stopPropagation();
    console.log('Model dropdown toggled');
  });
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
      checkboxes.forEach(cb => {
        if (cb !== this) cb.checked = false;
      });
      currentModel = this.dataset.model;
      modelBtn.textContent = "Model: " + this.parentElement.textContent.trim();
      modelsList.classList.add('hidden');
      chatFooter.textContent = "Model: " + this.parentElement.textContent.trim();
      console.log('Model selected:', currentModel);
    });
  });
} else {
  console.error('Model button or list not found in initial window');
}

document.addEventListener('click', function () {
  if (modelsList) modelsList.classList.add('hidden');
});

const startBtn = document.getElementById('start-btn');
const taskMenu = document.getElementById('task-menu');
if (startBtn && taskMenu) {
  startBtn.addEventListener('click', function (e) {
    taskMenu.classList.toggle('hidden');
    e.stopPropagation();
    console.log('Task menu toggled');
  });
}
document.addEventListener('click', function () {
  if (taskMenu) taskMenu.classList.add('hidden');
});

const menuNewChat = document.getElementById('menu-new-chat');
const menuSource = document.getElementById('menu-source');
const menuCredits = document.getElementById('menu-credits');
if (menuNewChat) {
  menuNewChat.addEventListener('click', function () {
    createNewChatWindow();
    taskMenu.classList.add('hidden');
    console.log('New chat menu item clicked');
  });
}
if (menuSource) {
  menuSource.addEventListener('click', function () {
    window.open('https://github.com/Argh94');
    taskMenu.classList.add('hidden');
    console.log('Source menu item clicked');
  });
}
if (menuCredits) {
  menuCredits.addEventListener('click', function () {
    document.getElementById('credits-window').classList.remove('hidden');
    taskMenu.classList.add('hidden');
    console.log('Credits menu item clicked');
  });
}

const closeCredits = document.getElementById('close-credits');
if (closeCredits) {
  closeCredits.addEventListener('click', function () {
    document.getElementById('credits-window').classList.add('hidden');
    console.log('Credits window closed');
  });
}

function updateClock() {
  const clock = document.getElementById('clock');
  if (clock) {
    clock.textContent = new Date().toLocaleTimeString();
  }
}
setInterval(updateClock, 1000);
updateClock();

console.log('Script initialized');
