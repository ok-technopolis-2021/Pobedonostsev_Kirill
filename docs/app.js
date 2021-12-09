var SkillView = /** @class */ (function () {
    function SkillView(skillsContainer) {
        this.skillsContainer = skillsContainer;
    }
    SkillView.prototype.removeSkill = function (skillNode) {
        skillNode.parentNode.remove();
    };
    SkillView.prototype.renderNewSkill = function (id, skill) {
        var skillItem = document.createElement('div');
        var skillItemInner = document.createElement('div');
        var skillSubtitle = document.createElement('div');
        var skillName = document.createElement('span');
        var skillRatio = document.createElement('span');
        var progressbar = document.createElement('div');
        var progressbarInner = document.createElement('span');
        var skillsButton = document.createElement('div');
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        skillItem.classList.add('skills__item');
        skillItemInner.classList.add('skills__item-inner');
        skillSubtitle.classList.add('skills__item-subtitle');
        progressbar.classList.add('progress-bar');
        skillsButton.classList.add('skills__button');
        skillsButton.classList.add('delete-button');
        skillsButton.id = id;
        skillName.innerText = skill.name;
        skillRatio.innerText = skill.ratio + '%';
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
        this.skillsContainer.appendChild(skillItem);
        return skillsButton;
    };
    return SkillView;
}());

var Skill = /** @class */ (function () {
    function Skill(name, ratio) {
        this.name = name;
        this.ratio = ratio;
    }
    return Skill;
}());

var SkillController = /** @class */ (function () {
    function SkillController(addSkillButton, addBlock) {
        var _this = this;
        this.startSkills = [
            new Skill('JavaScript', 85),
            new Skill('HTML', 100),
            new Skill('PHP', 75)
        ];
        this.skills = [];
        this.skillView = new SkillView(document.querySelector('.skills__content'));
        this.addBlock = addBlock;
        this.addForm = document.forms[0];
        this.inputs = this.addForm.querySelectorAll('.skills__input');
        for (var i = 0; i < this.startSkills.length; i++) {
            this.addSkill(this.startSkills[i]);
        }
        addSkillButton.addEventListener('click', function () { return _this.showSkillForm(); });
        this.addBlock.addEventListener('submit', function (event) { return _this.addSkillEvent(event); });
    }
    SkillController.prototype.addSkill = function (skill) {
        var _this = this;
        if (skill.ratio <= 100 && skill.ratio >= 0 && this.skills.length < 5 && skill.name.length < 20) {
            this.skills.push(skill);
            var skillsButton_1 = this.skillView.renderNewSkill(this.skills.length - 1, skill);
            skillsButton_1.addEventListener('click', function () {
                _this.removeSkill(skillsButton_1);
            });
        }
    };
    SkillController.prototype.removeSkill = function (skillNode) {
        this.skills.splice(Number(skillNode.id), 1);
        this.skillView.removeSkill(skillNode);
    };
    SkillController.prototype.addSkillEvent = function (event) {
        event.preventDefault();
        this.addSkill(new Skill(this.inputs[0].value, Number(this.inputs[1].value)));
        this.addForm.reset();
        this.addBlock.classList.add('hidden');
    };
    SkillController.prototype.showSkillForm = function () {
        this.addBlock.classList.toggle('hidden');
    };
    return SkillController;
}());

var switcher = document.getElementById('switcher');
switcher.addEventListener('change', switchTheme);
function switchTheme(event) {
    if (event.target.checked) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
    }
    else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}

var addSkillBtn = document.getElementById('add-skill');
var addBlock = document.querySelector('.skills__add-dialog');
new SkillController(addSkillBtn, addBlock);
