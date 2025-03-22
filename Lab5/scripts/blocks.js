class Block {
  constructor(data, type, editable = false) {
    this.type = type;
    this._data = data;
    this.editable = editable; // Добавляем параметр editable
  }

  toHTML() {
    throw new Error(
      "Блок типо абстрактный класс, так что не надо создавать экземпляр"
    );
  }

  getData() {
    return this._data;
  }
}

export class HeaderBlock extends Block {
  constructor(data) {
    super(
      {
        name: data?.name || "Имя не указано",
        city: data?.city || "Город не указан",
      },
      "HeaderBlock",
      true
    );
  }

  toHTML() {
    const { name, city } = this.getData(); // Используем getData()
    return `
      <div class="card header-box">
          <h1>${name}</h1>
          <p>${city}</p>
      </div>
    `;
  }
}

export class InfoBlock extends Block {
  constructor(data) {
    super(
      { speciality: data?.speciality || "Специальность не указана" },
      "InfoBlock",
      true
    );
  }

  toHTML() {
    return `
      <div class="card info-box">
        <h2>${this.getData().speciality}</h2>
      </div>
    `;
  }
}

export class SkillsBlock extends Block {
  constructor(data) {
    super({ skills: data?.skills || [] }, "SkillsBlock");
  }

  toHTML() {
    return `
      <div class="card skills-box">
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
      { content: data?.content || "Образование не указано" },
      "EducationBlock"
    );
  }

  toHTML() {
    return `
      <div class="card education-box">
          <h2>Образование</h2>
          <p>${this.getData().content}</p>
      </div>
    `;
  }
}

export class ExperienceBlock extends Block {
  constructor(data) {
    super(
      { content: data?.content || "Опыт работы не указан" },
      "ExperienceBlock"
    );
  }

  toHTML() {
    return `
      <div class="card experience-box">
          <h2>Опыт работы</h2>
          <p>${this.getData().content}</p>
      </div>
    `;
  }
}

export class AboutMeBlock extends Block {
  constructor(data) {
    super(
      { content: data?.content || "Информация о себе не указана" },
      "AboutMeBlock"
    );
  }

  toHTML() {
    return `
      <div class="card about-me-box">
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
        email: data?.email || "Email не указан",
        phone: data?.phone || "Телефон не указан",
        tg: data?.tg || "Телеграм не указан",
      },
      "ContactBlock"
    );
  }

  toHTML() {
    const { email, phone, tg } = this.getData();
    return `
      <div class="card contact-box">
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
        title: data?.title || "Заголовок не указан",
        content: data?.content || "Контент не указан",
      },
      "TextBlock",
      true
    );
  }

  toHTML() {
    const { title, content } = this.getData();
    return `
      <div class="card text-box">
          <h2>${title}</h2>
          <p>${content}</p>
      </div>
    `;
  }
}
