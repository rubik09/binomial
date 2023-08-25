import pool from '../utils/MySQL';

class User {
  constructor() {
    this.sql = pool;
  }

  async getUserId(user_id) {
    return this.sql.query('SELECT user_id FROM users WHERE ?', { user_id });
  }
  async getUserInfo(user_id) {
    return this.sql.query('SELECT * FROM users WHERE ?', { user_id });
  }

  async getCountSuccsesfullUserDeals(user_id, successful_deal) {
    return this.sql.query('SELECT COUNT(*) FROM deals WHERE ? AND ?',  [{ user_id }, { successful_deal }]);
  }

  async getSuccsesfullUserDeals(user_id, successful_deal) {
    return this.sql.query('SELECT signal_date, currency_pair FROM deals WHERE ? AND ? ORDER BY id DESC LIMIT 10',  [{ user_id }, { successful_deal }]);  }

  async addUserId(user_id, username) {
    return this.sql.query('INSERT INTO users SET ?;', { user_id, username });
  }
  async addUserDeal(user_id, currency_pair, signal_date) {
    return this.sql.query('INSERT INTO deals SET ?;', { user_id, currency_pair, signal_date });
  }
  async updateUserPositiveDeals(successful_deal, signal_date) {
    return this.sql.query('UPDATE deals SET ? WHERE ?', [{ successful_deal }, { signal_date }]);
  }
  async updateUserNegativeDeals(unsuccsesfull_deal, signal_date) {
    return this.sql.query('UPDATE deals SET ? WHERE ?', [{ unsuccsesfull_deal }, { signal_date }]);
  }

  async getUserState(user_id) {
    return this.sql.query('SELECT state FROM users WHERE ?', { user_id });  
  }

  async updateUserBalance(user_id, balance) {
    return this.sql.query('UPDATE users SET ? WHERE ?', [{ balance }, { user_id }]);
  }

  async updateUserBinomoId(user_id, binomo_id) {
    return this.sql.query('UPDATE users SET ? WHERE ?', [{ binomo_id }, { user_id }]);
  }
  async updateUserState(state ,user_id) {
    return this.sql.query('UPDATE users SET ? WHERE ?', [{ state }, { user_id }]);  
  }
}

export default new User();
