import { Component } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.scss']
})
export class SlidebarComponent {


  mangalist= [
    {idmanga: '119067', title: 'Bleach', chapter: '123', datetime: '12 giờ trước', img:'../assets/bleach.jpg',view: 112345 , detail:`For as long as he can remember, high school student Ichigo Kurosaki has been able to see the spirits of the dead, but that has not stopped him from leading an ordinary life. One day, Ichigo returns home to find an intruder in his room who introduces herself as Rukia Kuchiki, a Soul Reaper tasked with helping souls pass over. Suddenly, the two are jolted from their conversation when a Hollow—an evil spirit known for consuming souls—attacks. As Ichigo makes a brash attempt to stop the Hollow, Rukia steps in and shields him from a counterattack. Injured and unable to keep fighting, Rukia suggests a risky plan—transfer half of her Soul Reaper powers to Ichigo. He accepts and, to Rukia's surprise, ends up absorbing her powers entirely, allowing him to easily dispatch the Hollow.`},
    {idmanga: '111111',title: 'One Punch Man', chapter: '111', datetime: '2 giờ trước', img:'../assets/onepunchman.jpg',view: 45322 , detail: `The seemingly unimpressive Saitama has a rather unique hobby: being a hero. In order to pursue his childhood dream, Saitama relentlessly trained for three years, losing all of his hair in the process. Now, Saitama is so powerful, he can defeat any enemy with just one punch. However, having no one capable of matching his strength has led Saitama to an unexpected problem—he is no longer able to enjoy the thrill of battling and has become quite bored.`},
    {idmanga: '222222',title: 'Naruto', chapter: '686', datetime: '8 giờ trước', img:'../assets/naruto.jpg',view: 233111 , detail: `It has been two and a half years since Naruto Uzumaki left Konohagakure, the Hidden Leaf Village, for intense training following events which fueled his desire to be stronger. Now Akatsuki, the mysterious organization of elite rogue ninja, is closing in on their grand plan which may threaten the safety of the entire shinobi world.`},
    {idmanga: '333333',title: 'My Hero Acedemy', chapter: '345', datetime: '23 giờ trước', img:'../assets/myhero.jpg',view: 2366444 , detail: `The appearance of "quirks," newly discovered super powers, has been steadily increasing over the years, with 80 percent of humanity possessing various abilities from manipulation of elements to shapeshifting. This leaves the remainder of the world completely powerless, and Izuku Midoriya is one such individual.`},
    {idmanga: '444444',title: 'Oregairu', chapter: '89', datetime: '5 giờ trước', img:'../assets/oregairu.jpg',view: 12335644 , detail: `Hachiman Hikigaya, a student in Soubu High School, is a cynical loner due to his traumatic past experiences in his social life. This eventually led to him developing a set of "dead fish eyes" and a twisted personality similar to that of a petty criminal. Believing that the concept of youth is a lie made up by youngsters who face their failures in denial, he turns in an essay that criticizes this exact mentality of youths. Irritated by the submission, his homeroom teacher, Shizuka Hiratsuka, forces him to join the Volunteer Service Club—a club that assists students to solve their problems in life, hoping that helping other people would change his personality.`},
    {idmanga: '555555',title: 'Sakurasou', chapter: '67', datetime: '7 giờ trước', img:'../assets/sakurasou.jpg',view: 54478 , detail: `At Suimei High, the Sakura-sou dormitory is infamous for housing the school's most notorious delinquents. Thus, when the relatively tame Sorata Kanda is transferred to the dorm, escaping this insane asylum becomes his foremost goal. Trapped there for the time being, he must learn how to deal with his fellow residents, including bubbly animator Misaki Kamiigusa, charming playboy writer Jin Mitaka, and the ever-reclusive Ryuunosuke Akasaka. Surrounded by weirdness, Sorata frequently finds respite in his interactions with his one "normal" friend, aspiring voice actress Nanami Aoyama.`},
    {idmanga: '666666',title: 'Hyouka', chapter: '77', datetime: '11 giờ trước', img:'../assets/hyouka.jpg',view: 123455 , detail: `High school freshman Houtarou Oreki has but one goal: to lead a gray life while conserving as much energy as he can. Unfortunately, his peaceful days come to an end when his older sister, Tomoe, forces him to save the memberless Classics Club from disbandment.`},
    {idmanga: '777777',title: 'Fullmetal Alchemist', chapter: '222', datetime: '12 giờ trước', img:'../assets/fullmetal.jpg',view: 1232357 , detail: `After a horrific alchemy experiment goes wrong in the Elric household, brothers Edward and Alphonse are left in a catastrophic new reality. Ignoring the alchemical principle banning human transmutation, the boys attempted to bring their recently deceased mother back to life. Instead, they suffered brutal personal loss: Alphonse's body disintegrated while Edward lost a leg and then sacrificed an arm to keep Alphonse's soul in the physical realm by binding it to a hulking suit of armor.`},
    {idmanga: '888888',title: 'Kaguya Sama', chapter: '55', datetime: '7 giờ trước', img:'../assets/kaguya.jpg',view: 6342216 , detail: `After a slow but eventful summer vacation, Shuchiin Academy's second term is now starting in full force. As August transitions into September, Miyuki Shirogane's birthday looms ever closer, leaving Kaguya Shinomiya in a serious predicament as to how to celebrate it. Furthermore, the tenure of the school's 67th student council is coming to an end. Due to the council members being in different classes, the only time Kaguya and Miyuki have to be together will soon disappear, putting all of their cunning plans at risk.`},
    {idmanga: '999999',title: 'One Piece', chapter: '1034', datetime: '18 giờ trước', img:'../assets/onepiece.jpg',view: 134321 , detail: `Barely surviving in a barrel after passing through a terrible whirlpool at sea, carefree Monkey D. Luffy ends up aboard a ship under attack by fearsome pirates. Despite being a naive-looking teenager, he is not to be underestimated. Unmatched in battle, Luffy is a pirate himself who resolutely pursues the coveted One Piece treasure and the King of the Pirates title that comes with it.`},
  ]
  Topmangabydate(){
    const topdate = this.mangalist.sort((a,b)=> b.view - a.view).map(
      item=>{
        return{
          ...item,
          view: item.view.toLocaleString()
        };
      }
    );
    return topdate.slice(0,5);
  }
  getUrl(item: any){
    const id= item.idmanga;
    const name= item.title.replace(/ /g, '-');
      return `/Manga/${id}/${name}`;
  }
}
