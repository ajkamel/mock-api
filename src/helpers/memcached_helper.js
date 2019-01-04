import Memcached from 'memcached';
import config from './config_helper';
import logger from '../utils/logger';

export class MemcachedHelper {
  constructor() {
    const hosts = config.memcached.host.split(',').map((host) => {
      return `${host}:${config.memcached.port}`;
    }).join(',');

    this.memcached = new Memcached(hosts);
  }

  /**
     * Deletes a provided cache key
     *
     * @param key The cache key to delete
     * @returns {void}
     */
  deleteCacheKey(key) {
    this.memcached.del(key, (e) => {
      if (e) {
        logger.error(`There was an error clearing the ${key} cache key`, e);
      }
    });
  }
}

export default new MemcachedHelper();
