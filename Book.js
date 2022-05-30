class Book{
    constructor(){
        this.active = true;
        this.next = new BookButton(">",width/2 + 280,height/2+285,()=>this.NextPage());
        this.prev = new BookButton("<",width/2 - 280,height/2+285,()=>this.PrevPage());
        this.close = new BookButton("x",width/2 +280,height/2-275,()=>{this.active = false;})
        this.currPage = 0;
        this.pages = [];
    }

    SetImgsDirectory(dir){
        this.imgDir = dir;
    }
    NextPage(){
        this.currPage++;
        this.currPage = min(this.pages.length - 1 , max(0,this.currPage));
    }

    PrevPage(){
        this.currPage--;
        this.currPage = min(this.pages.length - 1 , max(0,this.currPage));
    }

    AddPage(jObj){
        let p = new Page(jObj,width/2,height/2-300,this.imgDir);
        this.pages.push(p);
    }

    CheckClicks(mx,my){
        this.prev.CheckClicks(mx,my);
        this.next.CheckClicks(mx,my);
        this.close.CheckClicks(mx,my);
    }

    Show(){
        this.active = true;
    }

    Draw(){
        if(this.active == false) return;

        fill(0,0,100);
        noStroke();

        rect(width/2-300,height/2-300,600,600,20);
        let page_size = this.pages.length;
        if(page_size > 0 && this.currPage < page_size) this.pages[this.currPage].Draw();
    
        textAlign(CENTER);
        textSize(18);
        noStroke();
        fill(255,255,255);
        let idx = this.currPage + 1;
        text(idx + " / " + page_size, width/2, height/2+285);
        
        this.next.Draw();
        this.prev.Draw();
        this.close.Draw();
    }
}

class Page{
    constructor(jObj,x,y,dir){
        this.title = jObj.title;
        this.body = jObj.body;
        if(jObj.icon != "") this.icon = loadImage(dir+"/"+jObj.icon);
        this.x =x;
        this.y =y;


    }

    Draw(){
        noStroke();
        textFont("consolas")
        fill(255,255,255);
        textAlign(CENTER);
        textSize(22);
        text(this.title,this.x ,this.y + 30);
        textAlign(LEFT);
        text(this.body,this.x-550/2 ,this.y + 260,550,300);
        
        if(this.icon != undefined){
            stroke(255,255,255);
            noFill();
            strokeWeight(2);
            let h = 190;
            let scaledW = h/this.icon.height * this.icon.width;

            let leftX = (width - scaledW)/2;
            rect(leftX,this.y+50,scaledW,h);
            image(this.icon,leftX,this.y + 50,scaledW,h);
        }

        strokeWeight(1);
        stroke(255,255,255);
        line(this.x-550/2,this.y+40,this.x+550/2,this.y+40);
        line(this.x-550/2,this.y+250,this.x+550/2,this.y+250);
        line(this.x-550/2,this.y+560,this.x+550/2,this.y+560);


    }
}

class BookButton{
    constructor(text,x,y,callback){
        this.text = text;
        this.x = x;
        this.y = y;
        this.callback = callback;
    }

    Draw(){
        noStroke();
        fill(255,255,255);
        textAlign(CENTER);
        noStroke();
        textSize(22);
        text(this.text,this.x ,this.y);

    }

    CheckClicks(mX, mY){
        if(mX < this.x - 15 || mX > this.x +15 ) return;
        if(mY < this.y - 15 || mY > this.y + 15 ) return;
        console.log(this.text + " clicked");
        this.callback();
    }

}

function LoadBookJSON(dir,book){
    loadJSON(dir, (data)=>{
        book.SetImgsDirectory(data.imagesDir);
        let pageData = data.pages;
        pageData.forEach(p => {
            book.AddPage(p);
        });
    });
}

