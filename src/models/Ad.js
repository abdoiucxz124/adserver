class Ad {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.content = data.content;
    this.imageUrl = data.imageUrl;
    this.clickUrl = data.clickUrl;
    this.category = data.category;
    this.placement = data.placement;
    this.active = data.active !== undefined ? data.active : true;
    this.priority = data.priority || 1;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  validate() {
    const errors = [];
    
    if (!this.title || this.title.trim().length === 0) {
      errors.push('Title is required');
    }
    
    if (!this.content || this.content.trim().length === 0) {
      errors.push('Content is required');
    }
    
    if (!this.clickUrl || !this.isValidUrl(this.clickUrl)) {
      errors.push('Valid click URL is required');
    }
    
    if (this.imageUrl && !this.isValidUrl(this.imageUrl)) {
      errors.push('Image URL must be valid');
    }
    
    return errors;
  }

  isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  }
}

module.exports = Ad;