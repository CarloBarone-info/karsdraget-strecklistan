import type { Member, OrchestraSection } from "../../types/domain";
import "./UserProfile.css";

type UserProfileProps = {
  member: Member;
  sections: OrchestraSection[];
  onLogout: () => void;
};

function UserProfile({ member, sections, onLogout }: UserProfileProps) {
  const sectionNames = member.sectionIds
    .map((sectionId) => sections.find((section) => section.id === sectionId))
    .filter((section): section is OrchestraSection => section !== undefined)
    .map((section) => section.name);

  return (
    <header className="user-profile">
      <div>
        <p className="user-profile__eyebrow">Min profil</p>
        <h1>{member.nickname}</h1>
        <dl className="user-profile__details">
          <div>
            <dt>Medlemsnummer</dt>
            <dd>#{member.id}</dd>
          </div>
          <div>
            <dt>Sektion</dt>
            <dd>{sectionNames.length > 0 ? sectionNames.join(", ") : "Ej angiven"}</dd>
          </div>
        </dl>
      </div>

      <button type="button" onClick={onLogout}>
        Logga ut
      </button>
    </header>
  );
}

export default UserProfile;
