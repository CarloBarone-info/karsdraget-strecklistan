import type { Member } from "../../types/domain";
import "./MemberRow.css";

type MemberRowProps = {
  member: Member;
  onSelect: () => void;
};

function MemberRow({ member, onSelect }: MemberRowProps) {
  return (
    <li className="member-row">
      <button type="button" className="member-row__button" onClick={onSelect}>
        <span className="member-row__number">#{member.id} </span>
        <strong className="member-row__nickname">{member.nickname} </strong>
        {/*<span className="member-row__status">Aktiv</span>*/}
      </button>
    </li>
  );
}

export default MemberRow;
