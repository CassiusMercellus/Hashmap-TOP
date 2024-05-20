class HashMap {
    constructor(initialCapacity = 16) {
      this.buckets = new Array(initialCapacity).fill(null).map(() => []);
      this.size = 0;
    }

    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode = hashCode % this.buckets.length;
      }
      return hashCode;
    }

    set(key, value) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      const existing = bucket.find(([k, v]) => k === key);
      
      if (existing) {
        existing[1] = value;
      } else {
        bucket.push([key, value]);
        this.size++;
      }

      if (this.size / this.buckets.length > 0.75) {
        this.resize(this.buckets.length * 2);
      }
    }

    get(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      const found = bucket.find(([k, v]) => k === key);
      return found ? found[1] : null;
    }
  
    has(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      return bucket.some(([k, v]) => k === key);
    }
  
    remove(key) {
      const index = this.hash(key);
      const bucket = this.buckets[index];
      const bucketIndex = bucket.findIndex(([k, v]) => k === key);
      
      if (bucketIndex !== -1) {
        bucket.splice(bucketIndex, 1);
        this.size--;
        return true;
      }
      return false;
    }
  
    length() {
      return this.size;
    }

    clear() {
      this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
      this.size = 0;
    }
  
    // Get all keys
    keys() {
      return this.buckets.flatMap(bucket => bucket.map(([key, value]) => key));
    }
  
    values() {
      return this.buckets.flatMap(bucket => bucket.map(([key, value]) => value));
    }
  
    entries() {
      return this.buckets.flatMap(bucket => bucket);
    }
  
    resize(newCapacity) {
      const oldBuckets = this.buckets;
      this.buckets = new Array(newCapacity).fill(null).map(() => []);
      this.size = 0;
  
      for (const bucket of oldBuckets) {
        for (const [key, value] of bucket) {
          this.set(key, value);
        }
      }
    }
  }
  