class SkillView {
    constructor(readonly skillsContainer) {
    }

    removeSkill(skillNode) {
        skillNode.parentNode.remove();
    }

    renderNewSkill(id, skill): HTMLElement {
        const skillItem: HTMLElement = document.createElement('div');
        const skillItemInner: HTMLElement = document.createElement('div');
        const skillSubtitle: HTMLElement = document.createElement('div');
        const skillName: HTMLElement = document.createElement('span');
        const skillRatio: HTMLElement = document.createElement('span');
        const progressbar: HTMLElement = document.createElement('div');
        const progressbarInner: HTMLElement = document.createElement('span');
        const skillsButton: HTMLElement = document.createElement('div');
        const svg: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const use: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');

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
    }
}

export default SkillView;
