export class ImageLoader {
  constructor(imageFiles) {
    this.imageFiles = imageFiles;
    this.images = {};
  }

  load() {
    const promises = [];
    for (let name in this.imageFiles) {
      promises.push(this.loadImage(name, this.imageFiles[name]));
    }
    return Promise.all(promises);
  }

  loadImage(name, path) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      this.images[name] = image;
      image.onload = () => resolve(name);
      image.src = path;
    });
  }
}

const loader = new ImageLoader({
  arab: "./img/arab-sprite.png",
});
loader.load().then((names) => {
  this.images = Object.assign(this.images, loader.images);
  this.isImagesLoaded = true;
  console.log(names);
});

console.log(loader);
