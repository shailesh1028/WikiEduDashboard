import { URLBuilder } from './URLBuilder';

describe('URLBuilder', () => {
  const defaults = {
    article: { language: 'en', project: 'wikipedia', title: 'My Article' },
    users: ['user1', 'user2']
  };
  it('should be able to create a new instance of itself', () => {
    const helper = new URLBuilder({ article: defaults.article, users: defaults.users });
    expect(typeof helper).toEqual('object');
  });

  describe('#parsedArticleURL', () => {
    it('should create a parsedArticleURL when given a valid article', () => {
      const helper = new URLBuilder({ article: defaults.article });
      const expected = 'https://en.wikipedia.org/w/api.php?action=parse&disableeditsection=true&format=json&page=My%20Article';
      expect(helper.parsedArticleURL()).toEqual(expected);
    });
    it('should throw an error if the project is missing', () => {
      const article = { language: 'en', title: 'My Article' };
      const result = new URLBuilder({ article });
      expect(() => result.parsedArticleURL()).toThrow(TypeError);
    });
    it('should throw an error if the title is missing', () => {
      const article = { language: 'en', project: 'wikipedia' };
      const result = new URLBuilder({ article });
      expect(() => result.parsedArticleURL()).toThrow(TypeError);
    });
  });

  describe('#wikiURL', () => {
    it('should create a wikiURL when given a valid article', () => {
      const helper = new URLBuilder({ article: defaults.article });
      expect(helper.wikiURL()).toEqual('https://en.wikipedia.org');
    });
    it('should default the language to `www` if it is missing', () => {
      const article = { project: 'wikipedia' };
      const helper = new URLBuilder({ article });
      expect(helper.wikiURL()).toEqual('https://www.wikipedia.org');
    });
    it('should throw an error if the project is missing', () => {
      const article = { language: 'en', title: 'My Article' };
      const result = new URLBuilder({ article });
      expect(() => result.wikiURL()).toThrow(TypeError);
    });
  });

  describe('#wikiwhoColorURL', () => {
    it('should create a wikiwhoColorURL when given a valid article', () => {
      const helper = new URLBuilder({ article: defaults.article });
      const expected = 'https://api.wikiwho.net/en/whocolor/v1.0.0-beta/My%20Article/';
      expect(helper.wikiwhoColorURL()).toEqual(expected);
    });
    it('should throw an error if the language is missing', () => {
      const article = { project: 'wikipedia', title: 'My Article' };
      const result = new URLBuilder({ article });
      expect(() => result.wikiwhoColorURL()).toThrow(TypeError);
    });
    it('should throw an error if the title is missing', () => {
      const article = { language: 'en', project: 'wikipedia' };
      const result = new URLBuilder({ article });
      expect(() => result.wikiwhoColorURL()).toThrow(TypeError);
    });
  });

  describe('#wikiwhoColorRevisionURL', () => {
    it('should create a wikiwhoColorRevisionURL when given a valid article', () => {
      const helper = new URLBuilder({ article: defaults.article });
      const expected = 'https://api.wikiwho.net/en/api/v1.0.0-beta/rev_content/My%20Article/?o_rev_id=true&editor=true&token_id=true&out=true&in=true';
      expect(helper.wikiwhoColorRevisionURL()).toEqual(expected);
    });
    it('should throw an error if the language is missing', () => {
      const article = { project: 'wikipedia', title: 'My Article' };
      const result = new URLBuilder({ article });
      expect(() => result.wikiwhoColorRevisionURL()).toThrow(TypeError);
    });
    it('should throw an error if the title is missing', () => {
      const article = { language: 'en', project: 'wikipedia' };
      const result = new URLBuilder({ article });
      expect(() => result.wikiwhoColorRevisionURL()).toThrow(TypeError);
    });
  });

  describe('#wikiUserQueryURL', () => {
    it('should create a wikiUserQueryURL when given a valid article and multiple users', () => {
      const helper = new URLBuilder({ article: defaults.article, users: defaults.users });
      const expected = 'https://en.wikipedia.org/w/api.php?action=query&list=users&format=json&ususers=user1%7Cuser2';
      expect(helper.wikiUserQueryURL()).toEqual(expected);
    });
    it('should create a wikiUserQueryURL when given a valid article and a single user', () => {
      const helper = new URLBuilder({ article: defaults.article, users: ['user1'] });
      const expected = 'https://en.wikipedia.org/w/api.php?action=query&list=users&format=json&ususers=user1';
      expect(helper.wikiUserQueryURL()).toEqual(expected);
    });
    it('should create a wikiUserQueryURL when given a valid article and users as an argument', () => {
      const users = ['user1', 'user2'];
      const helper = new URLBuilder({ article: defaults.article });
      const expected = 'https://en.wikipedia.org/w/api.php?action=query&list=users&format=json&ususers=user1%7Cuser2';
      expect(helper.wikiUserQueryURL(users)).toEqual(expected);
    });
    it('should throw an error if the project is missing', () => {
      const article = { language: 'en', title: 'My Article' };
      const result = new URLBuilder({ article, users: defaults.users });
      expect(() => result.wikiUserQueryURL()).toThrow(TypeError);
    });
    it('should throw an error if there are no users', () => {
      const result = new URLBuilder({ article: defaults.article });
      expect(() => result.wikiUserQueryURL()).toThrow(TypeError);
    });
  });
});

