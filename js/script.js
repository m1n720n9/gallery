const $container=$('.gallery'); //이미지들을 감싸는 갤러리
const $loadMoreBtn=$('.load-more'); //더보기 버튼
let $addItemCount=8; //클릭할 때마다 나오는 갯수
let $added=0; //처음 보이는 것 리스트 항목 모두 로드하면 버튼이 사라지게 할 용도
let allData=[]; 

// $.getJSON('파일경로', 할일);
$.getJSON('./data/content.json', function(data){
    initGallery(data);
});

$container.masonry({
    // options
    itemSelector: '.gallery-item',
    columnWidth: 210,
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
    let slicedDate;
    slicedDate=$allData.slice($added, $added += $addItemCount);
    $.each(slicedDate, function(idx, item){
        let itemHTML=
        '<li class="gallery-item">' + 
            '<a href="'+item.images.large+'">' +
                '<figure>' +
                    '<img src="'+item.images.thumb+'" alt="'+item.title+'">'+
                    '<figcaption>'+item.title+'</figcaption>'+
                '</figure>'+
            '</a>'+
        '</li>';
        elements.push($(itemHTML).get(0))
    })
    $container.append(elements);
    $added += slicedDate.length;

    if($added < $allData.length){
        $loadMoreBtn.show()
    }else{
        $loadMoreBtn.hide()
    }

    $container.imagesLoaded( function() {
        $container.masonry('appended', elements);
    });
      
}


