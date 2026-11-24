const contactEmail = "";
const dialog = document.querySelector("#project-dialog");
const list = document.querySelector("#project-list");
const status = document.querySelector("#project-status");

function showProject(project) {
  document.querySelector("#detail-title").textContent = project.title;
  document.querySelector("#detail-overview").textContent = project.overview;
  document.querySelector("#detail-role").textContent = project.role;
  const stack = document.querySelector("#detail-stack");
  stack.replaceChildren(...project.stack.map(technology => {
    const item = document.createElement("li");
    item.textContent = technology;
    return item;
  }));

  const repo = document.querySelector("#detail-repo");
  repo.hidden = !project.repository;
  if (project.repository) repo.href = project.repository;
  else repo.removeAttribute("href");
  dialog.showModal();
}

async function loadProjects() {
  status.textContent = "프로젝트를 불러오는 중입니다.";
  try {
    const response = await fetch("./data/projects.json");
    if (!response.ok) throw new Error("Project data unavailable");
    const projects = await response.json();
    for (const project of projects) {
      const card = document.createElement("article");
      card.className = "card";
      const title = document.createElement("h3");
      title.textContent = project.title;
      const summary = document.createElement("p");
      summary.textContent = project.summary;
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "자세히 보기";
      button.setAttribute("aria-label", project.title + " 자세히 보기");
      button.addEventListener("click", () => showProject(project));
      card.append(title, summary, button);
      list.append(card);
    }
    status.textContent = "";
  } catch {
    status.textContent = "프로젝트 목록을 불러오지 못했습니다. 페이지를 새로고침해 주세요.";
  }
}

if (contactEmail) {
  const email = document.querySelector("#email-address");
  email.textContent = contactEmail;
  email.hidden = false;
  const link = document.querySelector("#email-link");
  link.href = "mailto:" + contactEmail;
  link.hidden = false;
  const copy = document.querySelector("#copy-email");
  copy.hidden = false;
  copy.addEventListener("click", async () => {
    const feedback = document.querySelector("#contact-status");
    try {
      await navigator.clipboard.writeText(contactEmail);
      feedback.textContent = "이메일 주소를 복사했습니다.";
    } catch {
      feedback.textContent = "화면에 표시된 이메일 주소를 직접 선택해 복사해 주세요.";
    }
  });
}

loadProjects();
