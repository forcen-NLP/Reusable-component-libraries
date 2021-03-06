import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import style from "./style.scss";
import GVProgramDefaultAvatar from "./gv-propgram-default-avatar";


export interface GVProgramAvatarProps {
  url?: string;
  alt: string;
  level?: number;
  size?: string;
  className?: string;
  color?: string;
  imageClassName?: string;
  levelClassName?: string;
  onMouseOverLevel?: (e: any) => void;
  onMouseEnterLevel?: (e: any) => void;
  onMouseLeaveLevel?: (e: any) => void;
  onClickLevel?: (e: any) => void;
}

export interface GVProgramAvatarState {
  errored: boolean;
}

class GVProgramAvatar extends React.Component<
  GVProgramAvatarProps,
  GVProgramAvatarState
> {
  static propTypes: any;
  static defaultProps: any;

  constructor(props: GVProgramAvatarProps) {
    super(props);

    this.state = {
      errored: false
    };
  }
  handleError = (e: any) => {
    e.target.onerror = null;
    this.setState({ errored: true });
  };

  renderImage = () => {
    const { url, alt, color, imageClassName } = this.props;
    if (this.state.errored || url === undefined || url === null)
      return (
        <GVProgramDefaultAvatar color={color} imageClassName={imageClassName} />
      );
    return (
      <img
        className={classnames(imageClassName || style.programAvatarImage)}
        src={url}
        alt={alt}
        onError={this.handleError}
      />
    );
  };

  renderLevel = () => {
    const {
      level,
      levelClassName,
      onMouseOverLevel,
      onMouseEnterLevel,
      onMouseLeaveLevel,
      onClickLevel
    } = this.props;
    if (level === undefined) return null;
    return (
      <span
        onMouseOver={onMouseOverLevel}
        onMouseEnter={onMouseEnterLevel}
        onMouseLeave={onMouseLeaveLevel}
        onClick={onClickLevel}
        className={classnames(style.programAvatarLevel, levelClassName, {
          [style.programAvatarLevel1]: level === 1,
          [style.programAvatarLevel2]: level === 2,
          [style.programAvatarLevel3]: level === 3,
          [style.programAvatarLevel4]: level === 4,
          [style.programAvatarLevel5]: level === 5,
          [style.programAvatarLevel6]: level === 6,
          [style.programAvatarLevel7]: level === 7
        })}
      >
        {level}
      </span>
    );
  };

  render() {
    const { size, className } = this.props;

    return (
      <div
        className={classnames(style.programAvatar, className, {
          [style.programAvatarSmall]: size === "small",
          [style.programAvatarMedium]: size === "medium",
          [style.programAvatarBig]: size === "big"
        })}
      >
        {this.renderImage()}
        {this.renderLevel()}
      </div>
    );
  }
}

GVProgramAvatar.propTypes = {
  url: PropTypes.string,
  alt: PropTypes.string.isRequired,
  level: PropTypes.number,
  size: PropTypes.oneOf(["small", "medium", "big"]),
  color: PropTypes.string,
  className: PropTypes.string,
  imageClassName: PropTypes.string,
  levelClassName: PropTypes.string
};

GVProgramAvatar.defaultProps = {
  size: "small"
};

export { GVProgramDefaultAvatar };
export default GVProgramAvatar;
