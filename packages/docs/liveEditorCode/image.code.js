<Image
  alt="test"
  id="id1"
  className="a-class-name"
  src="//i.picsum.photos/id/1025/300/200.jpg"
  withLazy
  onLoad={() => console.log('image loaded')}
  onError={errorEvent => console.log(errorEvent)}
/>;
