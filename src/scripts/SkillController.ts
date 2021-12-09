import SkillView from "./SkillView";
import Skill from "./Skill";

class SkillController {
    readonly startSkills: Skill[] = [
        new Skill('JavaScript', 85),
        new Skill('HTML', 100),
        new Skill('PHP', 75)
    ];
    readonly skills: Skill[] = [];
    readonly skillView: SkillView;
    readonly addBlock: HTMLElement;
    readonly addForm: HTMLFormElement;
    readonly inputs: NodeListOf<HTMLInputElement>;

    constructor(addSkillButton: HTMLElement, addBlock: HTMLElement) {
        this.skillView = new SkillView(document.querySelector('.skills__content'));

        this.addBlock = addBlock;
        this.addForm = document.forms[0];
        this.inputs = this.addForm.querySelectorAll<HTMLInputElement>('.skills__input');

        for (let i = 0; i < this.startSkills.length; i++) {
            this.addSkill(this.startSkills[i]);
        }

        addSkillButton.addEventListener('click', () => this.showSkillForm());
        this.addBlock.addEventListener('submit', (event) => this.addSkillEvent(event));
    }

    addSkill(skill: Skill) {
        if (skill.ratio <= 100 && skill.ratio >= 0 && this.skills.length < 5 && skill.name.length < 20) {
            this.skills.push(skill);
            const skillsButton = this.skillView.renderNewSkill(this.skills.length - 1, skill);
            skillsButton.addEventListener('click', () => {
                this.removeSkill(skillsButton);
            });
        }
    }

    removeSkill(skillNode: HTMLElement) {
        this.skills.splice(Number(skillNode.id), 1);
        this.skillView.removeSkill(skillNode);
    }

    addSkillEvent(event) {
        event.preventDefault();
        this.addSkill(new Skill(this.inputs[0].value, Number(this.inputs[1].value)));
        this.addForm.reset();
        this.addBlock.classList.add('hidden');
    }

    showSkillForm() {
        this.addBlock.classList.toggle('hidden');
    }
}

export default SkillController;
