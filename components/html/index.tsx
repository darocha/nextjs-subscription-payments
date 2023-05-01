export default function Html({content='', children=''}){
    return <div dangerouslySetInnerHTML={{ __html: content || children }} />
}
