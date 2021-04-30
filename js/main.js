
$(function(){ 
 


    //welcome

    const welcome = document.querySelector(".welcome");
    welcome.addEventListener("mouseenter",function(){
    this.innerHTML = "Welcome to my world ;-)";
    this.classList.add('active')
    })
    welcome.addEventListener("mouseout",function(){
    this.innerHTML = "Welcome";
    this.classList.remove('active')
    })







    let page = ['port.html','work.html','about.html','contact.html'];

    $('header .logo').on('click',function(){
        $('main, header').toggleClass('active');
        if($('header').hasClass('active')){
            navOpen();
        }else{
            navClose();
        }
    })
    $('header li').on({
        mouseenter:function(){
            let idx = $(this).index();
            $('main section').hide();
            $('main section').eq(idx).stop().fadeIn(400);
        },
        click:function(e){
            e.preventDefault();
            navClose();
        }
    })
    function navOpen(){
        $('main, header').addClass('active');
        $('header .nav').css('zIndex','4').stop().slideDown();
    }   
    function navClose(){
        $('main, header').removeClass('active');
        $('header .nav').css('zIndex','4').stop().slideUp();
    }

    //page
    function pageFun(pageName){
        $.ajax({
            url:pageName,
            success:function(data){
                let section = $(data).find('section').clone();
                $('main').append(section);
            }
        })
    }
    page.forEach(function(v,k){
        setTimeout(function(){
            pageFun(page[k]);
        },100*k);
    });

   
    



    //work
    setTimeout(function(){
        $.ajax({
            url:'data.json',
            success:function(data){
                let thumTag='',
                thum,src,tit,summary;

                $.each($(data.work),function(k,v){
                    imgSrc = v.imgSrc;
                    tit = v.title;
                    txt = v.txt;
                    
                    thumTag ="<article class='thum'>";
                    thumTag +="<div>";
                    thumTag +="<img src="+imgSrc+">";
                    thumTag +="<div class='img_txt'>";
                    thumTag +="<h5>"+tit+"</h5>";
                    thumTag +="<p>"+txt+"</p>";
                    thumTag +="</div>";
                    thumTag +="</div>";
                    thumTag +="</article>";
                
                    $('.thum_body').append(thumTag);
                });

                $('.thum').on('click',function(){
                    let idx = $(this).index();
                    navClose();
                    $('.pop').css('display','flex');
                    dataChange(idx);               
                })
                $('.pop').on('click',function(){
                    $('.pop').hide();
                })

                function dataChange(idx){

                    let tit = $(data.work)[idx].title,
                        img = $(data.work)[idx].img,
                        sub = $(data.work)[idx].sub,
                        period = $(data.work)[idx].period,
                        role = $(data.work)[idx].role,
                        sitemap = $(data.work)[idx].sitemap,
                        Language = $(data.work)[idx].Language;
                    


                    $('.pop h4').text(tit);
                    $('.pop img').attr('src',img);
                    $('.pop p').text(sub);
                    $('.pop .perio').text(period);
                    $('.pop .role').text(role);
                    $('.pop .map').text(sitemap);
                    $('.pop .lang').text(Language);
                }
            }
        });
    },500)

   


   


    }
);