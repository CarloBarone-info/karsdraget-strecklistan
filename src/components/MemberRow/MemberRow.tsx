import type { Member } from "../../types/domain";
import "./MemberRow.css";

type MemberRowProps = {
  member: Member;
};

function MemberRow({ member }: MemberRowProps) {
  return (
    <li className="member-row">
      <span className="member-row__number">#{member.id}</span>
      <strong className="member-row__nickname">{member.nickname}</strong>
      <span className="member-row__status">Aktiv</span>
    </li>
  );
}

export default MemberRow;
