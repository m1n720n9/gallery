const $container=$('.gallery'); //이미지들을 감싸는 갤러리
const $loadMoreBtn=$('.load-more'); //더보기 버튼
let $addItemCount=8; //클릭할 때마다 나오는 갯수
let $added=0; //처음 보이는 것 리스트 항목 모두 로드하면 버튼이 사라지게 할 용도
let allData=[]; 

// $.getJSON('파일경로', 할일);
$.getJSON('./data/content.json', function(data){
    initGallery(data);
});
function initGallery(data){
    $allData=data;
    // console.log($allData);
    addItem();
    $loadMoreBtn.click(function(){
        addItem();
    });

}
function addItem(){
    let elements=[];
    let slicedData;
    slicedData=$allData.slice($added, $added += $addItemCount);
    $.each(slicedData, function(idx, item){
        let itemHTML=
        '<li class="gallery-item">' +
            '<a href="'+item.imges.large+'">' +
                '<figure>' +
                    '<img src="'+item.images.thumb+'" alt="'+item.title+'">' +
                    '<figcaption>'+item.title+'</figcaption>'+
                '</figure>'+
            '</a>'+
        '</li>';
        elements.push($(itemHTML).get(0))
    })
    $container.append(elements);
}


