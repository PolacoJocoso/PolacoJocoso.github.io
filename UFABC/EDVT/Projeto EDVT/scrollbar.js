class HScrollbar {

  constructor (xp, yp, sw, sh, l) {
    let swidth = sw;
    let sheight = sh;
    let widthtoheight = sw - sh;
    let ratio = sw / widthtoheight;
    let xpos = xp;
    let ypos = yp-sheight/2;
    let spos = xpos + swidth/2 - sheight/2;
    let newspos = spos;
    let sposMin = xpos;
    let sposMax = xpos + swidth - sheight;
    let loose = l;
  }

   update() {
    if (overEvent) {
      over = true;
    } else {
      over = false;
    }
    if (mousePressed && over) {
      locked = true;
    }
    if (!mousePressed) {
      locked = false;
    }
    if (locked) {
      newspos = constrain(mouseX-sheight/2, sposMin, sposMax);
    }
    if (abs(newspos - spos) > 1) {
      spos = spos + (newspos-spos)/loose;
    }
  }

   constrain( val,  minv,  maxv) {
    return min(max(val, minv), maxv);
  }

   function overEvent() {
    if (mouseX > xpos && mouseX < xpos+swidth &&
       mouseY > ypos && mouseY < ypos+sheight) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    noStroke();
    fill(204);
    rect(xpos, ypos, swidth, sheight);
    if (over || locked) {
      fill(0, 0, 0);
    } else {
      fill(102, 102, 102);
    }
    rect(spos, ypos, sheight, sheight);
  }

   getPos() {
    // Convert spos to be values between
    // 0 and the total width of the scrollbar
    return spos * ratio;
  }
}
