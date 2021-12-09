import SkillController from "./scripts/SkillController";
import './scripts/Switcher';

const addSkillBtn: HTMLElement = document.getElementById('add-skill');
const addBlock: HTMLElement = document.querySelector('.skills__add-dialog');

const skillController: SkillController = new SkillController(addSkillBtn, addBlock);
