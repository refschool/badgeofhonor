export interface Db {
  [owner: string]: {
    [repo: string]: {
      list: Array<{ name: string; total_pulls_request: number }>
      ageData: number | null
    }
  }
}

class DataBase {
  db: Db = {}
  ageMax = 86400000 // 24h = 86400000ms

  add(owner: string, repo: string) {
    this.db[owner] ??= {}
    this.db[owner][repo] = {
      list: [],
      ageData: null
    }
  }

  get(owner: string, repo: string) {
    if (typeof this.db[owner][repo] !== 'undefined') {
      return this.db[owner][repo]
    }
    return null
  }

  async update(owner: string, repo: string, callBack: { (): Promise<{ name: string; total_pulls_request: number; }[]>; (): { name: string; total_pulls_request: number; }[] | PromiseLike<{ name: string; total_pulls_request: number; }[]>; }) {
    if (this.#isUpdate(owner, repo)) {
      this.db[owner][repo].ageData = new Date().getTime()
      this.db[owner][repo].list = await callBack()
    }
  }

  del(owner: string) {
    delete this.db[owner]
  }

  #isUpdate(owner: string, repo: string) {
    if (typeof this.db[owner][repo].ageData !== 'number' || new Date().getTime() - this.db[owner][repo].ageData > this.ageMax) {
      return true
    }
    return false
  }
}

export default new DataBase()