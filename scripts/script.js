class SkillsHandler {
    constructor() {
        this.skillsContainer = document.querySelector('.skills__content');
        this.skills = [
            new Skill('JavaScript', 85),
            new Skill('HTML', 100),
            new Skill('PHP', 75)
        ];
        this.render();
    }

    addSkill(skill) {
        if (skill.ratio <= 100 && skill.ratio >= 0 && this.skills.length < 5 && skill.name) {
            this.skills.push(skill);
            this.createSkill(this.skills.length - 1);
        }
    }

    removeSkill(skillNode) {
        this.skills.splice(skillNode.id, 1);
        skillNode.parentNode.remove();
    }

    render() {
        this.skillsContainer.innerHTML = '';
        for (let i = 0; i < this.skills.length; i++) {
            this.createSkill(i);
        }
    }

    createSkill(id) {
        const skillItem = document.createElement('div');
        const skillItemInner = document.createElement('div');
        const skillSubtitle = document.createElement('div');
        const skillName = document.createElement('span');
        const skillRatio = document.createElement('span');
        const progressbar = document.createElement('div');
        const progressbarInner = document.createElement('span');
        const skillsButton = document.createElement('div');
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

        skillItem.classList.add('skills__item');
        skillItemInner.classList.add('skills__item-inner');
        skillSubtitle.classList.add('skills__item-subtitle');
        progressbar.classList.add('progress-bar');
        skillsButton.classList.add('skills__button');
        skillsButton.classList.add('delete-button');

        skillsButton.id = id;

        skillName.innerText = this.skills[id].name;
        skillRatio.innerText = this.skills[id].ratio + '%';

        progressbarInner.style.width = skillRatio.innerText;
        use.setAttribute('href', '#minus');

        skillItem.appendChild(skillItemInner);
        skillItem.appendChild(skillsButton);
        skillItemInner.appendChild(skillSubtitle);
        skillSubtitle.appendChild(skillName);
        skillSubtitle.appendChild(skillRatio);
        skillItemInner.appendChild(progressbar);
        progressbar.appendChild(progressbarInner);
        skillsButton.appendChild(svg);
        svg.appendChild(use);

        skillsButton.addEventListener('click', () => {
            skillsHandler.removeSkill(skillsButton);
        });

        this.skillsContainer.appendChild(skillItem);
    }
}

class Skill {
    constructor(name, ratio) {
        this.name = name;
        this.ratio = ratio;
    }
}

const switcher = document.getElementById('switcher');
const addSkillBtn = document.getElementById('add-skill');
const addBlock = document.querySelector('.skills__add-dialog');
const addForm = document.forms[0];
const inputs = addForm.getElementsByClassName('skills__input');

addSkillBtn.addEventListener('click', showSkillForm);
addForm.addEventListener('submit', addSkill);
switcher.addEventListener('change', switchTheme);

skillsHandler = new SkillsHandler();

function addSkill(event) {
    event.preventDefault();
    skillsHandler.addSkill(new Skill(inputs[0].value, inputs[1].value));
    addForm.reset();
    addBlock.classList.add('hidden');
}

function switchTheme(event) {
    if (event.target.checked) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}

function showSkillForm() {
    addBlock.classList.toggle('hidden');
}
