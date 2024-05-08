let workExperienceAmount = 0;
let educationAmount = 0;

addWorkExperience();
addEducation();

function addWorkExperience() {
  workExperienceAmount++;

  copyTemplateInto("work-experience-preview-template", "work-experience-preview", (clone) => {
    [...clone.querySelectorAll(".field")].forEach((el) => {
      el.setAttribute("data-id", el.getAttribute("data-id") + "-" + workExperienceAmount);
    });
  });

  copyTemplateInto("work-experience-editor-template", "work-experience-editor", (clone) => {
    [...clone.querySelectorAll("input, textarea")].forEach((el) => {
      el.setAttribute("name", el.getAttribute("name") + "-" + workExperienceAmount);
      el.setAttribute("id", el.getAttribute("id") + "-" + workExperienceAmount);
    });

    [...clone.querySelectorAll("label")].forEach((el) => {
      el.setAttribute("for", el.getAttribute("for") + "-" + workExperienceAmount);
    });
  });
}

function addEducation() {
  educationAmount++;

  copyTemplateInto("education-preview-template", "education-preview", (clone) => {
    [...clone.querySelectorAll(".field")].forEach((el) => {
      el.setAttribute("data-id", el.getAttribute("data-id") + "-" + educationAmount);
    });
  });

  copyTemplateInto("education-editor-template", "education-editor", (clone) => {
    [...clone.querySelectorAll("input, textarea")].forEach((el) => {
      el.setAttribute("name", el.getAttribute("name") + "-" + educationAmount);
      el.setAttribute("id", el.getAttribute("id") + "-" + educationAmount);
    });

    [...clone.querySelectorAll("label")].forEach((el) => {
      el.setAttribute("for", el.getAttribute("for") + "-" + educationAmount);
    });
  });
}

function copyTemplateInto(templateId, targetId, cloneModifierFn = undefined) {
  const template = document.getElementById(templateId);

  if (!template) {
    throw new Error(`Template '${templateId}' not found`);
  }

  const target = document.getElementById(targetId);

  if (!target) {
    throw new Error(`Target '${targetId}' not found`);
  }

  const clone = template.content.cloneNode(true);

  if (cloneModifierFn) {
    cloneModifierFn(clone);
  }

  target.append(clone);
}

function onFormInput() {
  const vars = [];

  [...document.querySelectorAll("#editor-form input, #editor-form textarea")].forEach((el) => {
    vars[el.getAttribute("name")] = el.value;
  });

  [...document.querySelectorAll("#preview .field")].forEach((field) => {
    const id = field.getAttribute("data-id");
    field.innerHTML = vars[id];
  });
}
