export interface Message_type{
    id : string,
    conversation_id :string,
    sender: 'user'| 'ai',
    text : string,
    timestamp : string
}

export interface conversation_type{
    id :string,
    created_at:string,
    updated_at:string
}