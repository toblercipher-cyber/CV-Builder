// Regular expressions for validation (Optional - kept simple for now)
const strRegex =  /^[a-zA-Z\s]*$/; 
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

/* ----------------------------------------------------------------------
   IMAGE PREVIEW
   ---------------------------------------------------------------------- */
function previewImage(){
    var file = document.querySelector('.image').files;
    if(file.length > 0){
        var fileReader = new FileReader();
        fileReader.onload = function(event){
            document.getElementById('image_dsp').setAttribute('src', event.target.result);
        };
        fileReader.readAsDataURL(file[0]);
    }
}

/* ----------------------------------------------------------------------
   GENERATE CV (Main Function)
   ---------------------------------------------------------------------- */
function generateCV(){
    // 1. Personal Info
    let firstname = document.querySelector('.firstname').value || "";
    let middlename = document.querySelector('.middlename').value || "";
    let lastname = document.querySelector('.lastname').value || "";
    
    let fullname = firstname + " " + middlename + " " + lastname;
    document.getElementById('fullname_dsp').innerHTML = fullname.trim() || "Your Name";

    document.getElementById('designation_dsp').innerHTML = document.querySelector('.designation').value || "Designation";
    document.getElementById('address_dsp').innerHTML = document.querySelector('.address').value || "Address";
    document.getElementById('email_dsp').innerHTML = document.querySelector('.email').value || "Email";
    document.getElementById('phoneno_dsp').innerHTML = document.querySelector('.phoneno').value || "Phone";
    document.getElementById('summary_dsp').innerHTML = document.querySelector('.summary').value || "Your summary...";

    // 2. Achievements
    let achieveTitles = document.querySelectorAll('.achieve_title');
    let achieveDescs = document.querySelectorAll('.achieve_description');
    let achieveList = '';
    
    for(let i=0; i < achieveTitles.length; i++){
        if(achieveTitles[i].value || achieveDescs[i].value){
            achieveList += `
            <div class="preview-item">
                <span class="preview-item-val" style="font-weight:bold;">${achieveTitles[i].value}</span>
                <span class="preview-item-val">${achieveDescs[i].value}</span>
            </div>`;
        }
    }
    document.getElementById('achievements_dsp').innerHTML = achieveList;

    // 3. Experience
    let expTitles = document.querySelectorAll('.exp_title');
    let expOrgs = document.querySelectorAll('.exp_organization');
    let expLocs = document.querySelectorAll('.exp_location');
    let expDescs = document.querySelectorAll('.exp_description');
    let expList = '';

    for(let i=0; i < expTitles.length; i++){
        if(expTitles[i].value || expOrgs[i].value){
            expList += `
            <div class="preview-item" style="margin-bottom: 15px;">
                <span class="preview-item-val" style="font-weight:bold; font-size: 1.1rem;">${expTitles[i].value}</span>
                <div style="display:flex; justify-content:space-between; font-size: 0.9rem; color: #555;">
                    <span>${expOrgs[i].value}</span>
                    <span>${expLocs[i].value}</span>
                </div>
                <span class="preview-item-val">${expDescs[i].value}</span>
            </div>`;
        }
    }
    document.getElementById('experiences_dsp').innerHTML = expList;

    // 4. Education
    let eduSchools = document.querySelectorAll('.edu_school');
    let eduDegrees = document.querySelectorAll('.edu_degree');
    let eduCities = document.querySelectorAll('.edu_city');
    let eduDescs = document.querySelectorAll('.edu_description');
    let eduList = '';

    for(let i=0; i < eduSchools.length; i++){
        if(eduSchools[i].value || eduDegrees[i].value){
            eduList += `
            <div class="preview-item" style="margin-bottom: 15px;">
                <span class="preview-item-val" style="font-weight:bold;">${eduSchools[i].value}</span>
                <div style="display:flex; justify-content:space-between; font-size: 0.9rem; color: #555;">
                    <span>${eduDegrees[i].value}</span>
                    <span>${eduCities[i].value}</span>
                </div>
                <span class="preview-item-val" style="font-style:italic;">${eduDescs[i].value}</span>
            </div>`;
        }
    }
    document.getElementById('educations_dsp').innerHTML = eduList;

    // 5. Projects
    let projTitles = document.querySelectorAll('.proj_title');
    let projLinks = document.querySelectorAll('.proj_link');
    let projDescs = document.querySelectorAll('.proj_description');
    let projList = '';

    for(let i=0; i < projTitles.length; i++){
        if(projTitles[i].value){
            projList += `
            <div class="preview-item" style="margin-bottom: 10px;">
                <div style="display:flex; justify-content:space-between;">
                    <span class="preview-item-val" style="font-weight:bold;">${projTitles[i].value}</span>
                    <a href="${projLinks[i].value}" target="_blank" style="font-size:0.8rem; color:blue;">Link</a>
                </div>
                <span class="preview-item-val">${projDescs[i].value}</span>
            </div>`;
        }
    }
    document.getElementById('projects_dsp').innerHTML = projList;

    // 6. Skills
    let skills = document.querySelectorAll('.skill');
    let skillList = '';

    for(let i=0; i < skills.length; i++){
        if(skills[i].value){
            skillList += `
            <span style="background:#eee; padding:5px 10px; margin:2px; display:inline-block; border-radius:4px; font-size:0.9rem;">
                ${skills[i].value}
            </span>`;
        }
    }
    document.getElementById('skills_dsp').innerHTML = skillList;
}

/* ----------------------------------------------------------------------
   PRINT CV
   ---------------------------------------------------------------------- */
function printCV(){
    window.print();
}

/* ----------------------------------------------------------------------
   HELPER: Create HTML Element from String
   ---------------------------------------------------------------------- */
function createElementFromHTML(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

/* ----------------------------------------------------------------------
   ADD REPEATER ITEMS (Dynamic Fields)
   ---------------------------------------------------------------------- */

function addAchievement(){
    const container = document.querySelector('.repeater-achievements');
    const html = `
    <div class="cv-form-row">
        <div class="cols-2">
            <div class="form-elem">
                <label class="form-label">Title</label>
                <input name="achieve_title" type="text" class="form-control achieve_title" placeholder="Title" onkeyup="generateCV()">
            </div>
            <div class="form-elem">
                <label class="form-label">Description</label>
                <input name="achieve_description" type="text" class="form-control achieve_description" placeholder="Description" onkeyup="generateCV()">
            </div>
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove(); generateCV()">Remove</button>
    </div>`;
    container.appendChild(createElementFromHTML(html));
}

function addExperience(){
    const container = document.querySelector('.repeater-experience');
    const html = `
    <div class="cv-form-row">
        <div class="cols-3">
            <div class="form-elem">
                <label class="form-label">Title</label>
                <input name="exp_title" type="text" class="form-control exp_title" onkeyup="generateCV()">
            </div>
            <div class="form-elem">
                <label class="form-label">Company</label>
                <input name="exp_organization" type="text" class="form-control exp_organization" onkeyup="generateCV()">
            </div>
            <div class="form-elem">
                <label class="form-label">Location</label>
                <input name="exp_location" type="text" class="form-control exp_location" onkeyup="generateCV()">
            </div>
        </div>
        <div class="form-elem">
            <label class="form-label">Description</label>
            <input name="exp_description" type="text" class="form-control exp_description" onkeyup="generateCV()">
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove(); generateCV()">Remove</button>
    </div>`;
    container.appendChild(createElementFromHTML(html));
}

function addEducation(){
    const container = document.querySelector('.repeater-education');
    const html = `
    <div class="cv-form-row">
        <div class="cols-3">
            <div class="form-elem">
                <label class="form-label">School</label>
                <input name="edu_school" type="text" class="form-control edu_school" onkeyup="generateCV()">
            </div>
            <div class="form-elem">
                <label class="form-label">Degree</label>
                <input name="edu_degree" type="text" class="form-control edu_degree" onkeyup="generateCV()">
            </div>
            <div class="form-elem">
                <label class="form-label">City</label>
                <input name="edu_city" type="text" class="form-control edu_city" onkeyup="generateCV()">
            </div>
        </div>
        <div class="form-elem">
            <label class="form-label">Description</label>
            <input name="edu_description" type="text" class="form-control edu_description" onkeyup="generateCV()">
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove(); generateCV()">Remove</button>
    </div>`;
    container.appendChild(createElementFromHTML(html));
}

function addProject(){
    const container = document.querySelector('.repeater-projects');
    const html = `
    <div class="cv-form-row">
        <div class="cols-2">
            <div class="form-elem">
                <label class="form-label">Title</label>
                <input name="proj_title" type="text" class="form-control proj_title" onkeyup="generateCV()">
            </div>
            <div class="form-elem">
                <label class="form-label">Link</label>
                <input name="proj_link" type="text" class="form-control proj_link" onkeyup="generateCV()">
            </div>
        </div>
        <div class="form-elem">
            <label class="form-label">Description</label>
            <input name="proj_description" type="text" class="form-control proj_description" onkeyup="generateCV()">
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove(); generateCV()">Remove</button>
    </div>`;
    container.appendChild(createElementFromHTML(html));
}

function addSkill(){
    const container = document.querySelector('.repeater-skills');
    const html = `
    <div class="cv-form-row">
        <div class="form-elem">
            <label class="form-label">Skill</label>
            <input name="skill" type="text" class="form-control skill" onkeyup="generateCV()">
        </div>
        <button type="button" class="btn btn-secondary" onclick="this.parentElement.remove(); generateCV()">Remove</button>
    </div>`;
    container.appendChild(createElementFromHTML(html));
}