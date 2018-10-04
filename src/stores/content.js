import {observable, action} from 'mobx';
import axios from 'axios';

export default class {
  @observable items = [];
  @observable page = 1;
  @observable maxPages = 1;
  @observable showLoader = false;
  @observable itemsType = "";
  @observable paginable = false;
  @observable headline = "";
  @observable item = null;
  @observable comments = [];


  constructor() {
    this.axios = axios.create({
      baseURL: '/api/'
    });
    this.itemsPerPage = 30;
    this.itemsType = null;
  }

  @action async showTopStories(page) {
    await this.getItems('topstories',page);
    this.headline = "Top Stories";
  }

  @action async showNewStories(page) {
    await this.getItems('newstories', page)
    this.headline = "New Stories";
  }

  @action async showBestStories(page) {
    await this.getItems('beststories', page)
    this.headline = "Best Stories";
  }

  @action async showQuestions(page) {
    await this.getItems('askstories', page)
    this.headline = "Questions";
  }

  @action async showPresentations(page) {
    await this.getItems('showstories', page)
    this.headline = "Show";
  }

  @action async showJobs(page) {
    await this.getItems('jobstories', page)
    this.headline = "Jobs";
  }
  @action async showItem(id) {
    this.showLoader= true;
    let itemObject;

    itemObject = this.items.find((item) => {
      if (item.id === id) return true;
      return false
    });
    
    console.log(itemObject);
    if (!itemObject) {
      itemObject = await this.getItem(id);
    }

    this.page = 1;
    this.item = itemObject;
    this.showLoader = false;
    this.paginable = false;
  }

  async getItem(id) {
    let itemObject = await this.axios.get(`/item/${id}.json`);
    if (!itemObject) return null;
    return itemObject.data;
  }

  async getItems(type, page) {
    this.showLoader = true;
    this.items = [];
    this.maxPages = 1;

    let items = [];
    let res = await this.axios.get(`${type}.json`);
    let maxPages = Math.ceil(res.data.length/this.itemsPerPage);
    if (maxPages < page) page = maxPages;
    
    for (let i = ((page-1)*this.itemsPerPage); i < (page * this.itemsPerPage); i++) {
      try {
        let itemId = res.data[i];
        if (!itemId) break;
        let itemObject = await this.getItem(itemId);
        if (itemObject) items.push(itemObject);
      } catch(e) {
        console.error(`failed to get item ${res.data[i]}`);
        console.error(e);
      }
    }

    this.itemsType = type;
    this.page = page;
    this.items = items;
    this.maxPages = maxPages;
    this.showLoader = false;
    this.paginable = true;
  }
}
