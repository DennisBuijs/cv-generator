let workExperienceAmount = 0;
addWorkExperience();

function addWorkExperience() {
  workExperienceAmount++;

  addWorkExperiencePreview();
  addWorkExperienceEditor();
}

function addWorkExperiencePreview() {
  const previewTemplateId = "work-experience-preview-template";
  const previewTemplate = document.getElementById(previewTemplateId);

  if (!previewTemplate) {
    throw new Error(`Template '${previewTemplateId}' not found`);
  }

  const previewSectionId = "work-experience-preview";
  const previewSection = document.getElementById(previewSectionId);

  if (!previewSection) {
    throw new Error(`Preview section '${previewSectionId}' not found`);
  }

  const previewTemplateClone = previewTemplate.content.cloneNode(true);

  [...previewTemplateClone.querySelectorAll(".field")].forEach((el) => {
    el.setAttribute("data-id", el.getAttribute("data-id") + "-" + workExperienceAmount);
  });

  previewSection.append(previewTemplateClone);
}

function addWorkExperienceEditor() {
  const editorTemplateId = "work-experience-editor-template";
  const editorTemplate = document.getElementById(editorTemplateId);

  if (!editorTemplate) {
    throw new Error(`Template '${editorTemplateId}' not found`);
  }

  const editorSectionId = "work-experience-editor";
  const editorSection = document.getElementById(editorSectionId);

  if (!editorSection) {
    throw new Error(`Editor section '${editorSectionId}' not found`);
  }

  const editorTemplateClone = editorTemplate.content.cloneNode(true);

  [...editorTemplateClone.querySelectorAll("input, textarea")].forEach((el) => {
    el.setAttribute("name", el.getAttribute("name") + "-" + workExperienceAmount);
    el.setAttribute("id", el.getAttribute("id") + "-" + workExperienceAmount);
  });

  [...editorTemplateClone.querySelectorAll("label")].forEach((el) => {
    el.setAttribute("for", el.getAttribute("for") + "-" + workExperienceAmount);
  });

  editorSection.append(editorTemplateClone);
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
