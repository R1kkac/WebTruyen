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