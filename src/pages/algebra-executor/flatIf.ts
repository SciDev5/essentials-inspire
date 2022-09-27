export default function flatIf<T>(arr:T[],getLayerConditionally:(v:T)=>null|T[]) {
    return arr.flatMap(v=>(
        getLayerConditionally(v) ?? [v]
    ));
}