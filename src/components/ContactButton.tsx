import { useState } from "react"

export default function ContactButton() {
  const [isContactButtonActive, setIsContactButtonActive] = useState(false)

  return (
    <div id="wa" className="wa__widget_container">
      <div className={`wa__btn_popup ${isContactButtonActive ? 'wa__active' : ''}`} style={{left: 'unset', right: '30px', bottom: '30px'}} onClick={() => setIsContactButtonActive(!isContactButtonActive)}>
        <div className="wa__btn_popup_txt" style={{display: 'block', left: 'unset', right: '100%', marginRight: '7px', marginLeft: '0px', width: '130px'}}>
          <span><strong>Layanan info PSB</strong></span>
        </div>
        <div className="wa__btn_popup_icon" style={{background: 'rgb(45, 183, 66)'}}></div>
      </div>
      <div className={`wa__popup_chat_box ${isContactButtonActive ? 'wa__pending wa__active wa__lauch' : ''}`} style={{left: 'unset', right: '30px', bottom: '102px'}}>
        <div className="wa__popup_heading" style={{background: 'rgb(45, 183, 66)'}}>
          <div className="wa__popup_title" style={{color: 'rgb(255, 255, 255)'}}>Kontak WA Balqis Jogja</div>
          <div className="wa__popup_intro" style={{color: 'rgb(217, 235, 198)'}}>Untuk menghubungi CS, bisa melalui WA dibawah ini</div>
        </div>
        <div className="wa__popup_content wa__popup_content_left">
          <div className="wa__popup_notice">Insyaalaah CS akan segera merespon</div>
          <div className="wa__popup_content_list">
            <div className="wa__popup_content_item">
              <a target="_blank" href="https://api.whatsapp.com/send?phone=6287871956868&amp;text=Assalamualaikum CS 1 Balqis Jogja, saya mau bertanya soal PSB Balqis Jogja, mohon dibantu.." rel="nofollow noopener noreferrer" className="wa__stt wa__stt_online">
                <div className="wa__popup_avatar">
                  <div className="wa__cs_img_wrap" style={{background: 'url("/contact-profile.png") center center / cover no-repeat'}}></div>
                </div>
                <div className="wa__popup_txt">
                  <div className="wa__member_name">Customer Service 1</div>
                  <div className="wa__member_duty">Balqis Jogja</div>
                </div>
              </a>
            </div>
            <div className="wa__popup_content_item">
              <a target="_blank" href="https://api.whatsapp.com/send?phone=6281228594844&amp;text=Assalamualaikum CS 2 Balqis Jogja, saya mau bertanya soal PSB Balqis Jogja, mohon dibantu.." rel="nofollow noopener noreferrer" className="wa__stt wa__stt_online">
                <div className="wa__popup_avatar">
                  <div className="wa__cs_img_wrap" style={{background: 'url("/contact-profile.png") center center / cover no-repeat'}}></div>
                </div>
                <div className="wa__popup_txt">
                  <div className="wa__member_name">Customer Service 2</div>
                  <div className="wa__member_duty">Balqis Jogja</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}