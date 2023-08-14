import Link from "next/link";

export default function Brosur() {
  return (
    <div id="brosur">
      <div className="d-grid gap-2 mb-2">
        <Link target="_blank" className="btn btn-primary btn-lg mb-2" href="brosur_psb_2024.pdf"  download="brosur_psb_2024.pdf">Download Brosur</Link>
      </div>
      <embed src="brosur_psb_2024.pdf" width="100%" height="1200px" />
    </div>
  )
}