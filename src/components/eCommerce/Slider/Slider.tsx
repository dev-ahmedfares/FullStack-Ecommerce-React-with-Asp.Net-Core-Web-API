import { Carousel } from "react-bootstrap";

export default function Slider() {
  return (
    <Carousel slide={false} variant="dark" fade>
      <Carousel.Item
        style={{ position: "relative", backgroundColor: "var(--light-100)" }}
      >
        <div>
          <img
            src="https://depot.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide1-img.png"
            style={{
              width: "400px",
              height: "430px",
              position: "absolute",
              top: "20px",
              right: "100px",
            }}
          />
        </div>
        <Carousel.Caption>
          <h3>THINK DIFFERENT.</h3>
          <p>
            Depot is a unique & captivating theme designed specifically for all
            types of shops and online stores.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{ position: "relative", backgroundColor: "var(--light-100)" }}
      >
        <div>
          <img
            src="https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide3-img.jpg"
            style={{
              width: "400px",
              height: "600px",
              position: "absolute",
              bottom: "-160px",
              right: "100px",
            }}
          />
        </div>
        <Carousel.Caption>
          <h3>CONTEMPORARY DESIGN.</h3>
          <p>
            A large set of beautiful & fully flexible homepage layouts lets you
            create your website quickly & easily.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item
        style={{ position: "relative", backgroundColor: "var(--light-100)" }}
      >
        <div>
          <img
            src="https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide2-img1.png"
            style={{
              width: "260px",
              height: "500px",
              position: "absolute",
              top: "-80px",
              right: "260px",
            }}
          />
          <img
            src="https://depot.qodeinteractive.com/wp-content/uploads/2017/02/h1-slide2-img2.png"
            style={{
              width: "210px",
              height: "420px",
              position: "absolute",
              top: "-60px",
              right: "100px",
            }}
          />
        </div>
        <Carousel.Caption>
          <h3>PREMIUM COMFORT.</h3>
          <p>
            One-click import feature lets you import the complete Depot demo
            content with a single mouse click.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
