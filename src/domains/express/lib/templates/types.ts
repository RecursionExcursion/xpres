type TemplateType = {
  fileName: string;
  content: Record<string, string | object>;
};

export class Template {
  #fields: TemplateType;

  constructor(params: TemplateType) {
    this.#fields = params;
  }

  get fileName() {
    return this.#fields.fileName;
  }

  get content() {
    return this.#fields.content;
  }

  toJSON(): string {
    return JSON.stringify(this.#fields.content);
  }
}
