import{_ as v,aj as M,ak as j,al as F,am as Y,l as i,d as _,an as H,ao as q,ap as z,ab as K,aq as O,ar as Q,as as U,at as V,au as W}from"./mermaid.core-DExujunr.js";import{G as k}from"./graph-SgFc7OiM.js";import{l as Z}from"./layout-BnXSK3YP.js";import{w as N}from"./json-CaiJp4qL.js";import"./app-CWJ_pNoM.js";import"./commonjsHelpers-Cpj98o6Y.js";import"./transform-B023kV5i.js";import"./baseUniq-C8P-TIJv.js";import"./basePickBy-De66e6pt.js";import"./clone-CM7464qz.js";var f=new Map,p=new Map,B=new Map,$=v(()=>{p.clear(),B.clear(),f.clear()},"clear"),D=v((e,t)=>{const n=p.get(t)||[];return i.trace("In isDescendant",t," ",e," = ",n.includes(e)),n.includes(e)},"isDescendant"),I=v((e,t)=>{const n=p.get(t)||[];return i.info("Descendants of ",t," is ",n),i.info("Edge is ",e),e.v===t||e.w===t?!1:n?n.includes(e.v)||D(e.v,t)||D(e.w,t)||n.includes(e.w):(i.debug("Tilt, ",t,",not in descendants"),!1)},"edgeInCluster"),A=v((e,t,n,o)=>{i.warn("Copying children of ",e,"root",o,"data",t.node(e),o);const d=t.children(e)||[];e!==o&&d.push(e),i.warn("Copying (nodes) clusterId",e,"nodes",d),d.forEach(c=>{if(t.children(c).length>0)A(c,t,n,o);else{const r=t.node(c);i.info("cp ",c," to ",o," with parent ",e),n.setNode(c,r),o!==t.parent(c)&&(i.warn("Setting parent",c,t.parent(c)),n.setParent(c,t.parent(c))),e!==o&&c!==e?(i.debug("Setting parent",c,e),n.setParent(c,e)):(i.info("In copy ",e,"root",o,"data",t.node(e),o),i.debug("Not Setting parent for node=",c,"cluster!==rootId",e!==o,"node!==clusterId",c!==e));const u=t.edges(c);i.debug("Copying Edges",u),u.forEach(l=>{i.info("Edge",l);const X=t.edge(l.v,l.w,l.name);i.info("Edge data",X,o);try{I(l,o)?(i.info("Copying as ",l.v,l.w,X,l.name),n.setEdge(l.v,l.w,X,l.name),i.info("newGraph edges ",n.edges(),n.edge(n.edges()[0]))):i.info("Skipping copy of edge ",l.v,"-->",l.w," rootId: ",o," clusterId:",e)}catch(C){i.error(C)}})}i.debug("Removing node",c),t.removeNode(c)})},"copy"),J=v((e,t)=>{const n=t.children(e);let o=[...n];for(const d of n)B.set(d,e),o=[...o,...J(d,t)];return o},"extractDescendants"),L=v((e,t,n)=>{const o=e.edges().filter(l=>l.v===t||l.w===t),d=e.edges().filter(l=>l.v===n||l.w===n),c=o.map(l=>({v:l.v===t?n:l.v,w:l.w===t?t:l.w})),r=d.map(l=>({v:l.v,w:l.w}));return c.filter(l=>r.some(X=>l.v===X.v&&l.w===X.w))},"findCommonEdges"),S=v((e,t,n)=>{const o=t.children(e);if(i.trace("Searching children of id ",e,o),o.length<1)return e;let d;for(const c of o){const r=S(c,t,n),u=L(t,n,r);if(r)if(u.length>0)d=r;else return r}return d},"findNonClusterChild"),P=v(e=>!f.has(e)||!f.get(e).externalConnections?e:f.has(e)?f.get(e).id:e,"getAnchorId"),ee=v((e,t)=>{if(!e||t>10){i.debug("Opting out, no graph ");return}else i.debug("Opting in, graph ");e.nodes().forEach(function(n){e.children(n).length>0&&(i.warn("Cluster identified",n," Replacement id in edges: ",S(n,e,n)),p.set(n,J(n,e)),f.set(n,{id:S(n,e,n),clusterData:e.node(n)}))}),e.nodes().forEach(function(n){const o=e.children(n),d=e.edges();o.length>0?(i.debug("Cluster identified",n,p),d.forEach(c=>{const r=D(c.v,n),u=D(c.w,n);r^u&&(i.warn("Edge: ",c," leaves cluster ",n),i.warn("Descendants of XXX ",n,": ",p.get(n)),f.get(n).externalConnections=!0)})):i.debug("Not a cluster ",n,p)});for(let n of f.keys()){const o=f.get(n).id,d=e.parent(o);d!==n&&f.has(d)&&!f.get(d).externalConnections&&(f.get(n).id=d)}e.edges().forEach(function(n){const o=e.edge(n);i.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(n)),i.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(e.edge(n)));let d=n.v,c=n.w;if(i.warn("Fix XXX",f,"ids:",n.v,n.w,"Translating: ",f.get(n.v)," --- ",f.get(n.w)),f.get(n.v)||f.get(n.w)){if(i.warn("Fixing and trying - removing XXX",n.v,n.w,n.name),d=P(n.v),c=P(n.w),e.removeEdge(n.v,n.w,n.name),d!==n.v){const r=e.parent(d);f.get(r).externalConnections=!0,o.fromCluster=n.v}if(c!==n.w){const r=e.parent(c);f.get(r).externalConnections=!0,o.toCluster=n.w}i.warn("Fix Replacing with XXX",d,c,n.name),e.setEdge(d,c,o,n.name)}}),i.warn("Adjusted Graph",N(e)),G(e,0),i.trace(f)},"adjustClustersAndEdges"),G=v((e,t)=>{var d,c;if(i.warn("extractor - ",t,N(e),e.children("D")),t>10){i.error("Bailing out");return}let n=e.nodes(),o=!1;for(const r of n){const u=e.children(r);o=o||u.length>0}if(!o){i.debug("Done, no node has children",e.nodes());return}i.debug("Nodes = ",n,t);for(const r of n)if(i.debug("Extracting node",r,f,f.has(r)&&!f.get(r).externalConnections,!e.parent(r),e.node(r),e.children("D")," Depth ",t),!f.has(r))i.debug("Not a cluster",r,t);else if(!f.get(r).externalConnections&&e.children(r)&&e.children(r).length>0){i.warn("Cluster without external connections, without a parent and with children",r,t);let l=e.graph().rankdir==="TB"?"LR":"TB";(c=(d=f.get(r))==null?void 0:d.clusterData)!=null&&c.dir&&(l=f.get(r).clusterData.dir,i.warn("Fixing dir",f.get(r).clusterData.dir,l));const X=new k({multigraph:!0,compound:!0}).setGraph({rankdir:l,nodesep:50,ranksep:50,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});i.warn("Old graph before copy",N(e)),A(r,e,X,r),e.setNode(r,{clusterNode:!0,id:r,clusterData:f.get(r).clusterData,label:f.get(r).label,graph:X}),i.warn("New graph after copy node: (",r,")",N(X)),i.debug("Old graph after copy",N(e))}else i.warn("Cluster ** ",r," **not meeting the criteria !externalConnections:",!f.get(r).externalConnections," no parent: ",!e.parent(r)," children ",e.children(r)&&e.children(r).length>0,e.children("D"),t),i.debug(f);n=e.nodes(),i.warn("New list of nodes",n);for(const r of n){const u=e.node(r);i.warn(" Now next level",r,u),u!=null&&u.clusterNode&&G(u.graph,t+1)}},"extractor"),R=v((e,t)=>{if(t.length===0)return[];let n=Object.assign([],t);return t.forEach(o=>{const d=e.children(o),c=R(e,d);n=[...n,...c]}),n},"sorter"),ne=v(e=>R(e,e.children()),"sortNodesByHierarchy"),T=v(async(e,t,n,o,d,c)=>{i.warn("Graph in recursive render:XAX",N(t),d);const r=t.graph().rankdir;i.trace("Dir in recursive render - dir:",r);const u=e.insert("g").attr("class","root");t.nodes()?i.info("Recursive render XXX",t.nodes()):i.info("No nodes found for",t),t.edges().length>0&&i.info("Recursive edges",t.edge(t.edges()[0]));const l=u.insert("g").attr("class","clusters"),X=u.insert("g").attr("class","edgePaths"),C=u.insert("g").attr("class","edgeLabels"),g=u.insert("g").attr("class","nodes");await Promise.all(t.nodes().map(async function(a){const s=t.node(a);if(d!==void 0){const m=JSON.parse(JSON.stringify(d.clusterData));i.trace(`Setting data for parent cluster XXX
 Node.id = `,a,`
 data=`,m.height,`
Parent cluster`,d.height),t.setNode(d.id,m),t.parent(a)||(i.trace("Setting parent",a,d.id),t.setParent(a,d.id,m))}if(i.info("(Insert) Node XXX"+a+": "+JSON.stringify(t.node(a))),s!=null&&s.clusterNode){i.info("Cluster identified XBX",a,s.width,t.node(a));const{ranksep:m,nodesep:h}=t.graph();s.graph.setGraph({...s.graph.graph(),ranksep:m+25,nodesep:h});const b=await T(g,s.graph,n,o,t.node(a),c),x=b.elem;H(s,x),s.diff=b.diff||0,i.info("New compound node after recursive render XAX",a,"width",s.width,"height",s.height),q(x,s)}else t.children(a).length>0?(i.trace("Cluster - the non recursive path XBX",a,s.id,s,s.width,"Graph:",t),i.trace(S(s.id,t)),f.set(s.id,{id:S(s.id,t),node:s})):(i.trace("Node - the non recursive path XAX",a,g,t.node(a),r),await z(g,t.node(a),r))})),await v(async()=>{const a=t.edges().map(async function(s){const m=t.edge(s.v,s.w,s.name);i.info("Edge "+s.v+" -> "+s.w+": "+JSON.stringify(s)),i.info("Edge "+s.v+" -> "+s.w+": ",s," ",JSON.stringify(t.edge(s))),i.info("Fix",f,"ids:",s.v,s.w,"Translating: ",f.get(s.v),f.get(s.w)),await W(C,m)});await Promise.all(a)},"processEdges")(),i.info("Graph before layout:",JSON.stringify(N(t))),i.info("############################################# XXX"),i.info("###                Layout                 ### XXX"),i.info("############################################# XXX"),Z(t),i.info("Graph after layout:",JSON.stringify(N(t)));let E=0,{subGraphTitleTotalMargin:y}=K(c);return await Promise.all(ne(t).map(async function(a){var m;const s=t.node(a);if(i.info("Position XBX => "+a+": ("+s.x,","+s.y,") width: ",s.width," height: ",s.height),s!=null&&s.clusterNode)s.y+=y,i.info("A tainted cluster node XBX1",a,s.id,s.width,s.height,s.x,s.y,t.parent(a)),f.get(s.id).node=s,O(s);else if(t.children(a).length>0){i.info("A pure cluster node XBX1",a,s.id,s.x,s.y,s.width,s.height,t.parent(a)),s.height+=y,t.node(s.parentId);const h=(s==null?void 0:s.padding)/2||0,b=((m=s==null?void 0:s.labelBBox)==null?void 0:m.height)||0,x=b-h||0;i.debug("OffsetY",x,"labelHeight",b,"halfPadding",h),await Q(l,s),f.get(s.id).node=s}else{const h=t.node(s.parentId);s.y+=y/2,i.info("A regular node XBX1 - using the padding",s.id,"parent",s.parentId,s.width,s.height,s.x,s.y,"offsetY",s.offsetY,"parent",h,h==null?void 0:h.offsetY,s),O(s)}})),t.edges().forEach(function(a){const s=t.edge(a);i.info("Edge "+a.v+" -> "+a.w+": "+JSON.stringify(s),s),s.points.forEach(x=>x.y+=y/2);const m=t.node(a.v);var h=t.node(a.w);const b=U(X,s,f,n,m,h,o);V(s,b)}),t.nodes().forEach(function(a){const s=t.node(a);i.info(a,s.type,s.diff),s.isGroup&&(E=s.diff)}),i.warn("Returning from recursive render XAX",u,E),{elem:u,diff:E}},"recursiveRender"),ue=v(async(e,t)=>{var c,r,u,l,X,C;const n=new k({multigraph:!0,compound:!0}).setGraph({rankdir:e.direction,nodesep:((c=e.config)==null?void 0:c.nodeSpacing)||((u=(r=e.config)==null?void 0:r.flowchart)==null?void 0:u.nodeSpacing)||e.nodeSpacing,ranksep:((l=e.config)==null?void 0:l.rankSpacing)||((C=(X=e.config)==null?void 0:X.flowchart)==null?void 0:C.rankSpacing)||e.rankSpacing,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),o=t.select("g");M(o,e.markers,e.type,e.diagramId),j(),F(),Y(),$(),e.nodes.forEach(g=>{n.setNode(g.id,{...g}),g.parentId&&n.setParent(g.id,g.parentId)}),i.debug("Edges:",e.edges),e.edges.forEach(g=>{if(g.start===g.end){const w=g.start,E=w+"---"+w+"---1",y=w+"---"+w+"---2",a=n.node(w);n.setNode(E,{domId:E,id:E,parentId:a.parentId,labelStyle:"",label:"",padding:0,shape:"labelRect",style:"",width:10,height:10}),n.setParent(E,a.parentId),n.setNode(y,{domId:y,id:y,parentId:a.parentId,labelStyle:"",padding:0,shape:"labelRect",label:"",style:"",width:10,height:10}),n.setParent(y,a.parentId);const s=structuredClone(g),m=structuredClone(g),h=structuredClone(g);s.label="",s.arrowTypeEnd="none",s.id=w+"-cyclic-special-1",m.arrowTypeEnd="none",m.id=w+"-cyclic-special-mid",h.label="",a.isGroup&&(s.fromCluster=w,h.toCluster=w),h.id=w+"-cyclic-special-2",n.setEdge(w,E,s,w+"-cyclic-special-0"),n.setEdge(E,y,m,w+"-cyclic-special-1"),n.setEdge(y,w,h,w+"-cyc<lic-special-2")}else n.setEdge(g.start,g.end,{...g},g.id)}),i.warn("Graph at first:",JSON.stringify(N(n))),ee(n),i.warn("Graph after XAX:",JSON.stringify(N(n)));const d=_();await T(o,n,e.type,e.diagramId,void 0,d)},"render");export{ue as render};
