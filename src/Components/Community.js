import { withRouter } from "react-router-dom";

let BossSkins = () => {
  let members = [
    {
      name: "Maya",
      pfp: "",
      website: "",
      talents: [],
      work: [
        {
          name: "",
          type: "image",
          link: "",
        },
      ],
    },
  ];

  let membersRendered = members.map((m, i) => {
    return (
      <div className="member" key={i}>
        <div className="member-info">
          <img src={m.pfp} alt="profile" />
          <div>
            <p>{m.name}</p>
            <p>{m.website}</p>
            <p>{m.talents}</p>
          </div>
        </div>
        <div className="member-projects"></div>
      </div>
    );
  });

  return (
    <div className="home" id="BossSkins">
      <div className="items-container">{membersRendered}</div>
    </div>
  );
};

export default withRouter(BossSkins);
