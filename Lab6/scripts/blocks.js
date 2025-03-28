class Block {
    constructor(data, type, editable = false) {
        this.type = type;
        this._data = data;
        this.editable = editable; // Добавляем параметр editable
    }

    toHTML() {

    }

    getData() {
        return this._data;
    }
}

export class HeaderBlock extends Block {
    constructor(data) {
        super(
            {
                name: data.name,
                city: data.city
            },
            "HeaderBlock",
            true
        );
    }

    toHTML() {
        const {name, city} = this.getData();
        return `
              <div class="block header-box">
                  <h1>${name}</h1>
                  <p>${city}</p>
              </div>
    `;
    }
}

export class InfoBlock extends Block {
    constructor(data) {
        super(
            {speciality: data.speciality},
            "InfoBlock",
            true
        );
    }

    toHTML() {
        return `
      <div class="block info-box">
        <h2>${this.getData().speciality}</h2>
      </div>
    `;
    }
}

export class SkillsBlock extends Block {
    constructor(data) {
        super({skills: data.skills}, "SkillsBlock");
    }

    toHTML() {
        return `
      <div class="block skills-box">
          <h2>Навыки</h2>
          <ul>
              ${this.getData()
            .skills.map((skill) => `<li>${skill}</li>`)
            .join("")}
          </ul>
      </div>
    `;
    }
}

export class EducationBlock extends Block {
    constructor(data) {
        super(
            {content: data.content},
            "EducationBlock"
        );
    }

    toHTML() {
        return `
      <div class="block education-box">
          <h2>Образование</h2>
          <p>${this.getData().content}</p>
      </div>
    `;
    }
}

export class ExperienceBlock extends Block {
    constructor(data) {
        super(
            {content: data.content},
            "ExperienceBlock"
        );
    }

    toHTML() {
        return `
      <div class="block experience-box">
          <h2>Опыт работы</h2>
          <p>${this.getData().content}</p>
      </div>
    `;
    }
}

export class AboutMeBlock extends Block {
    constructor(data) {
        super(
            {content: data.content},
            "AboutMeBlock"
        );
    }

    toHTML() {
        return `
      <div class="block about-me-box">
          <h2>Обо мне</h2>
          <p>${this.getData().content}</p>
      </div>
    `;
    }
}

export class ContactBlock extends Block {
    constructor(data) {
        super(
            {
                email: data.email,
                phone: data.phone,
                tg: data.tg
            },
            "ContactBlock"
        );
    }

    toHTML() {
        const {email, phone, tg} = this.getData();
        return `
      <div class="block contact-box">
          <h2>Контакты</h2>
          <ul>
              <li>Email: ${email}</li>
              <li>Телефон: ${phone}</li>
              <li>Телеграм: ${tg}</li>
          </ul>
      </div>
    `;
    }
}

export class TextBlock extends Block {
    constructor(data) {
        super(
            {
                title: data.title,
                content: data.content
            },
            "TextBlock",
            true
        );
    }

    toHTML() {
        const {title, content} = this.getData();
        return `
      <div class="block text-box">
          <h2>${title}</h2>
          <p>${content}</p>
      </div>
    `;
    }
}
