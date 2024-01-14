export interface user{
    id: string;
    avatar: string;
    name: string;
    email: string;
  }
  export interface cookie{
    status: boolean;
    isLogout: boolean;
    token: string;
    user: string;
  }
  export interface manga_history{
    id: string;
    image: string;
    name: string;
    date: string;
  }
  export interface index_history_read_chapter{
    id_m: string;
    id_ct: string;
    cur_index: number;
    num_of_data:number;
    time:string;
  }
  
export interface user_info_detail{
  email: string;
  name: string;
  phone: string;
}
export interface userChangePass{
  email: string;
  oldpassword: string;
  newpassword: string;
}
export interface usercookie{
  avatar: string;
  id: string;
  name: string;
}
export interface Notifications {
  Type: string;
  Message: string;
  Targetimage: string;
  Idtarget: string;
  Target: string;
  Date: string;
}
export interface RoomCreate
{
    MangaId: string;
    RoomName:string;
    image: string;
}
export interface UserChatRoom
{
    Id: string;
    Avatar: string;
    Name: string;
}
export interface room_users
{
    roomId: string;
    numberuser: string;
}
export class replycomment{
  id: string='';
  date: string='';
  iduser: string='';
  namereply: string='';
  data: string='';
  avatar: string='';
  name: string='';
  constructor(public Id: string, 
    public Date: string,
    public Iduser: string,
    public Namereply: string,
    public Data: string,
    public Avatar: string,
    public Name: string,) {
      this.id = Id;
      this.date = Date;
      this.iduser = Iduser;
      this.namereply = Namereply;
      this.data= Data;
      this.avatar= Avatar;
      this.name= Name
    }

}
export interface userlogin{
  username: string;
  password: string;
}
export interface register{
  UserName: string;
  Password: string;
  Email: string;
}
